import sharp from 'sharp'

const calculateLineOffset = (lineCount, index, fontSize) => {
  const rowHeight = fontSize * 1.25
  const totalHeight = rowHeight * lineCount

  return (rowHeight * index) + (rowHeight / 2) + ((600 / 2) - (totalHeight / 2))
}

const logoFile = 'public/logo-light-192x192.png'

const site = Buffer.from(`
  <svg width="1920" height="80" viewBox="0 0 1920 80">
    <text font-family="Inter" x="50%" y="50" alignment-baseline="after-edge" text-anchor="middle" style="font-size: 60px;" fill="#aaaaaa">voracious.dev</text>
  </svg>
`)

export const makeImage = async ({ lines, output }) => {
  const logo = await sharp(logoFile).resize(60, 60).toBuffer()
  const title = Buffer.from(`
    <svg width="1920" height="600" viewBox="0 0 1920 600">
      ${
        lines.map((line, index) => {
          return `
            <text font-family="Inter" x="50%" y="${calculateLineOffset(lines.length, index, 80)}" text-anchor="middle" style="font-size: 80px; font-family: Inter; font-weight: 700;" fill="#dddddd">${line}</text>
          `
        })
      }
    </svg>
  `)

  return sharp({
    create: {
      background: { r: 23, g: 23, b: 23 },
      channels: 3,
      height: 960,
      width: 1920,
    },
  })
    .composite([
      { input: site, top: 790, left: 0 },
      { input: logo, top: 100, left: 940 },
      { input: title },
    ])
    .png()
    .toFile(output)
}
