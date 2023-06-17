---
title: How to fix tab completion for complex Git aliases
tags: [Bash, Git, TIL]
series: til
createdAt: 2022-08-01T20:58:44.231Z
updatedAt: 2022-08-01T20:58:44.231Z
---

In an earlier post, I talked about how to [print the underlying commands for your Git aliases](https://davidmyers.dev/blog/print-the-underlying-command-whenever-you-run-a-git-alias) when you run them by utilizing "complex" aliases. This can lead to a better pairing experience, but it can come with a cost when implemented improperly: **broken tab completion**.

<!-- more -->

A "complex" Git alias is an alias that is written in one of the following formats in a `.gitconfig` file. Prefixing the alias expansion with `!` tells Git to treat it as a shell command.

```ini
co = !/usr/bin/alt-checkout
co = "!f() { /usr/bin/alt-checkout; }; f"
```

The problem is that Git cannot infer the underlying Git command for tab completion as it is written. Thankfully, there is a little-known "trick" documented in the [Git source code](https://github.com/git/git/blob/23b219f8e3f2adfb0441e135f0a880e6124f766c/contrib/completion/git-completion.bash#L26-L30) that allows us to specify a command to use for completion.

> If you use complex aliases of form '!f() { ... }; f', you can use the null command ':' as the first command in the function body to declare the desired completion style.  For example '!f() { : git commit ; ... }; f' will tell the completion to use commit completion.  This also works with aliases of form "!sh -c '...'".  For example, "!sh -c ': git commit ; ... '".

Knowing this, we can rewrite our aliases to fix tab completion.

```ini
co = !bash -c ': git checkout ; /usr/bin/alt-checkout'
co = "!f() { : git checkout ; /usr/bin/alt-checkout; }; f"
```

Take note of the space around the null command both after the `:` and before the `;`. These spaces are required, and tab completion will not work without them.

### A new discovery, maybe?

Through a bit of trial and error, I discovered a new way to write these aliases that is, in my opinion, a little more readable. Since Git treats the entire expansion as a shell command when you use the `!` prefix, you can actually declare the null command immediately after the `!` and chain it with your desired command to run.

```ini
co = !: git checkout && /usr/bin/alt-checkout
```

Along with properly tab-completing, this format has the added benefit of being able to pass arguments directly to the underlying script without forwarding arguments via `$@`.

Thanks for reading. ✌️
