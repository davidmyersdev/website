---
title: 'How to add an app to Spotlight on macOS'
tags: [macOS, TIL]
createdAt: 2023-07-07T16:22:38.694Z
updatedAt: 2023-07-07T16:22:38.694Z
---

Some apps, such as the iOS Simulator, are not indexed by Spotlight on macOS due to their install location.

<!-- more -->

Thankfully, you can add them to the index with the `mdimport` command.

```bash [~/]
mdimport /System/Volumes/Data/Applications/Xcode.app/Contents/Developer/Applications/Simulator.app
```
