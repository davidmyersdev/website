# A Practical Guide to the Web Cryptography API

Client-side encryption is a feature I had wanted to implement in [Octo](https://octo.app) for a while now. When it finally came time to tackle it, I was surprised at the sparse real-world examples on the topic. The documentation on [MDN](https://developer.mozilla.org/en-US/) is robust, but it requires a lot of jumping around to individual method APIs. I hope this article is helpful for anyone out there looking for guidance.

*Note: The Web Cryptography API is asynchronous, so I use the async/await syntax in this article for concision.*

### SubtleCrypto

The Web Cryptography API was initially exposed through a nonstandard interface called [Crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto), but it was later standardized through a new interface called [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto). This article will focus on the public SubtleCrypto interface exposed at `window.crypto.subtle`.

## Encryption

For the purposes of this article, we are going to use a symmetric algorithm. The public-key (asymmetric) strategy has a hard limit on how much data it can encrypt based on key size: `(keyBits / 8) - padding`. Symmetric encryption uses the same key to encrypt and decrypt data, and it does not have the same constraint. There are a few [supported algorithms](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#Supported_algorithms), but the recommended symmetric algorithm is `AES-GCM` for its [authenticated mode](https://en.wikipedia.org/wiki/Authenticated_encryption).

### Generating a Key

To start things off, we need to generate a symmetric key.

```js
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
const generateKey = async () => {
  return window.crypto.subtle.generateKey({
    name: 'AES-GCM',
    length: 256,
  }, true, ['encrypt', 'decrypt'])
}
```

### Encoding Data

Before we can encrypt data, we first have to encode it into a byte stream. We can achieve this pretty simply with the `TextEncoder` class. This little utility will be used by our `encrypt` function later.

```js
// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
const encode = (data) => {
  const encoder = new TextEncoder()

  return encoder.encode(data)
}
```

### Generating an Initialization Vector (IV)

Simply put, an IV is what introduces true randomness into our encryption strategy. When using the same key to encrypt multiple sets of data, it is possible to derive relationships between the encrypted chunks of the cipher and therefore expose some or all of the original message. IVs ensure that repeating character sequences in the input data produce varying byte sequences in the resulting cipher. It is perfectly safe to store IVs in plain text alongside our encrypted message, and we will need to do this to decrypt our message later.

```js
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const generateIv = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
  return window.crypto.getRandomValues(new Uint8Array(12))
}
```

We never want to use the same IV with a given key, so it's best to incorporate automatic IV generation into our encryption strategy as we will do later.

### Encrypting Data

Now that we have all of our utilities in place, we can implement our `encrypt` function! As mentioned above, we will need it to return both the cipher _and_ the IV so that we can decrypt the cipher later.

```js
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
const encrypt = async (data, key) => {
  const encoded = encode(data)
  const iv = generateIv()
  const cipher = await window.crypto.subtle.encrypt({
    name: 'AES-GCM',
    iv: iv,
  }, key, encoded)

  return {
    cipher,
    iv,
  }
}
```

## Transmission and Storage

Most practical applications of encryption involve transmission or storage of said encrypted data. When data is encrypted using SubtleCrypto, the resulting cipher and IV are represented as raw binary data buffers. This is not an ideal format for transmission or storage, so we will tackle packing and unpacking next.

### Packing Data

Since data is often transmitted in JSON and stored in databases, it makes sense to pack our data in a format that is portable. We are going to convert our binary data buffers into base64-encoded strings. Depending on your use case, the base64 encoding is absolutely optional, but I find it helps make the data as portable as you could possibly need.

```js
// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
const pack = (buffer) => {
  return window.btoa(
    String.fromCharCode.apply(null, new Uint8Array(buffer))
  )
}
```

### Unpacking Data

Once our packed data has been transmitted, stored, and later retrieved, we just need to reverse the process. We will convert our base64-encoded strings back into raw binary buffers.

```js
// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
const unpack = (packed) => {
  const string = window.atob(packed)
  const buffer = new ArrayBuffer(string.length)
  const bufferView = new Uint8Array(buffer)

  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i)
  }

  return buffer
}
```

## Decryption

We're in the home stretch! The last step of the process is decrypting our data to see those sweet, sweet secrets. As with unpacking, we just need to reverse the encryption process.

### Decoding Data

After decrypting, we will need to decode our resulting byte stream back into its original form. We can achieve this with the `TextDecoder` class. This utility will be used by our `decrypt` function later.

```js
// https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
const decode = (bytestream) => {
  const decoder = new TextDecoder()

  return decoder.decode(bytestream)
}
```

### Decrypting Data

Now we just need to implement the `decrypt` function. As mentioned before, we will need to supply not just the key but also the IV that was used in the encryption step.

```js
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
const decrypt = async (cipher, key, iv) => {
  const encoded = await window.crypto.subtle.decrypt({
    name: 'AES-GCM',
    iv: iv,
  }, key, cipher)

  return decode(encoded)
}
```

## Putting it into Practice

Let's write an app! Now that all of our utilities are built, we just need to use them. We will encrypt, pack, and transmit our data to a secure endpoint. Then, we will retrieve, unpack, and decrypt the original message.

```js
const app = async () => {
  // encrypt message
  const first = 'Hello, World!'
  const key = await generateKey()
  const { cipher, iv } = await encrypt(first, key)

  // pack and transmit
  await fetch('/secure-api', {
    method: 'POST',
    body: JSON.stringify({
      cipher: pack(cipher),
      iv: pack(iv),
    }),
  })

  // retrieve
  const response = await fetch('/secure-api').then(res => res.json())

  // unpack and decrypt message
  const final = await decrypt(unpack(response.cipher), key, unpack(response.iv))
  console.log(final) // logs 'Hello, World!'
}
```

That's all there is to it! We have successfully implemented client-side encryption.

As a final note, I just want to share [Octo](https://octo.app), a writing app for developers, one more time. It's free, it's open source, and I would absolutely love it if you checked it out. Thanks, everyone, and happy coding. ✌️
