---
title: Install and use multiple Bundler versions
tags: [til, ruby]
series:
  name: Today I Learned
  path: /til
createdAt: 2022-06-09T02:48:06.248Z
updatedAt: 2022-06-09T02:48:06.248Z
---

As of Bundler v2.3 (when using RubyGems v3.3+), Bundler will automatically use the `BUNDLED WITH` version specified in `Gemfile.lock` when running the `bundle install` command. If the specified version of Bundler is not available, [it will be downloaded and installed](https://bundler.io/blog/2022/01/23/bundler-v2-3.html).

<!-- more -->

```bash
$ bundler -v
Bundler version 2.3.15

$ tail -2 ./example/Gemfile.lock
BUNDLED WITH
   2.1.4

$ (cd ./example && bundler -v)
Bundler version 2.1.4
```

If you can't upgrade to v2.3, there is a workaround. You will have to install the correct version of Bundler manually, but then you can use the `_version_` syntax.

```bash
$ bundler _2.1.4_ -v
Bundler version 2.1.4
```
