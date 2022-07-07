---
title: Print the underlying command whenever you run a Git alias
tags: [bash, git, til]
series: til
createdAt: 2022-06-10T15:58:44.231Z
updatedAt: 2022-06-10T15:58:44.231Z
---

In a recent pair programming session, someone mentioned that it was a little hard to follow my command line workflow due to my regular use of [Git aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases). As someone who enjoys pair programming, I decided to take that feedback to heart and figure out a way to make the experience better for my future pairing partners. I landed on a solution that prints the underlying command of a Git alias any time I run one.

<!-- more -->

Imagine you have an alias called `git l` that logs the last 3 lines of your `git log` output in a custom format. The configuration for such an alias might look something like this.

```ini
# ~/.gitconfig
[alias]
  l = log --graph --oneline --max-count 3
```

```bash
$ git l
* 9f363ea (HEAD -> main, origin/main, origin/HEAD) Fix publish timestamp
* 54e7287 Add TIL series, update design, other improvements
* f235f4f Add support for comments with Giscus
```

As you can see, the underlying command is obscured by the alias, so a third-party observer could only reason about what is actually happening by examining the output. All hope is not lost though.

Since an alias can invoke an external command with the `!` character, we can rewrite our aliases to take advantage of the [ Bash `set` builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin). According to the docs, [any single-character `set` option can be used when invoking the shell](https://www.gnu.org/software/bash/manual/bash.html#Invoking-Bash). This feature, along with the behavior of the `set -v` option, makes for a concise solution to our problem.

```ini
# ~/.gitconfig
[alias]
  l = !bash -v -c 'git log --graph --oneline --max-count 3'
```

```bash
$ git l
git log --graph --oneline --max-count 3 # <- the underlying command
* 9f363ea (HEAD -> main, origin/main, origin/HEAD) Fix publish timestamp
* 54e7287 Add TIL series, update design, other improvements
* f235f4f Add support for comments with Giscus
```

If you found this post useful, have a question, or just want to say hi, please leave a comment down below. Thanks for reading, and happy coding. ✌️
