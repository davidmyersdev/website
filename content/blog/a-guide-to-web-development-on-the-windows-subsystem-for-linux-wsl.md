---
title: A Guide to Web Development on the Windows Subsystem for Linux (WSL)
tags: [bash, linux, windows]
createdAt: 2020-12-28T05:00:00.000Z
updatedAt: 2020-12-28T05:00:00.000Z
---

This guide assumes you already have the Windows Subsystem for Linux (WSL) 2 installed. If that is not the case, I highly recommend you read through my previous article,  [A Guide to Installing the Windows Subsystem for Linux (WSL) and Windows Terminal](https://voracious.dev/a-guide-to-installing-the-windows-subsystem-for-linux-wsl-and-windows-terminal), first. We are going to cover some of the most common web development tools that we need to get up and running, but there might be something missing. If that is the case, please leave a comment below! While I am using my own experience as a foundation, I am happy to amend this article as needed to make sure we cover the most common tools.

<!-- more -->

## Update Linux package repositories

Make sure the Linux packages are up-to-date.

```bash
sudo apt update && sudo apt upgrade -y
```

## Git

Make sure Git is installed and up-to-date.

```bash
sudo apt install -y git
```

### Sign your commits with GPG

Make sure GPG is installed and up-to-date.

```bash
sudo apt install -y gnupg
```

#### Generate a GPG key

To use GPG signing with Git, you will need a GPG keypair. If you already have one, you can skip to the next step. This command will prompt you for the settings of your new key. If you do not know what to choose for the key settings, just go with the defaults. The two things you will need to provide are your name and your email.

```bash
# generate a new gpg key
gpg --full-generate-key
```

#### Configure Git to sign commits

This information is based on [GitHub's guide](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/telling-git-about-your-signing-key). To list and highlight your available signing keys, run the following command.

```bash
gpg --list-secret-keys --keyid-format long | grep -A 2 ^sec | grep -A 2 -P "(?<=/)\w+"
```

Copy the highlighted part of your desired key (on the `sec` line after the `/`) for the next step. The terminal output should look something like this.

![](https://i.imgur.com/xROdSK9.png)

Now you need to tell Git about your signing key and enable commit signing.

```bash
# replace `<key>` with the key copied above
git config --global user.signingkey <key>

# enable commit signing
git config --global commit.gpgsign true
```

## GitHub

GitHub is the most common platform for code hosting, and it is the one I use. That said, this information should be applicable to other platforms as well.

### SSH

If you prefer to use SSH for GitHub (like me), you can generate a new SSH keypair and copy the public key to your clipboard using a Windows utility called `clip.exe`. Run the following commands to generate a new SSH keypair and copy the public key to your clipboard. Make sure you update the fake email below to match your actual email. If you decide to change the name of your generated SSH key, make sure to update the second command with the appropriate file name (`id_ed25519` is the default).

```bash
# generate the ssh keypair
ssh-keygen -t ed25519 -C youremail@provider.example

# copy the public key
cat ~/.ssh/id_ed25519.pub | clip.exe
```

You can then upload your public key to GitHub via your [settings page](https://github.com/settings/keys) under the SSH keys section.

### GPG

If you generated a GPG keypair in the Git section above, you can export the public key for use in GitHub or any other provider where you want your commits to show up as verified. Run the following command to copy the public key to your clipboard. Make sure you update the fake email below to match your actual email.

```bash
# copy the public key
gpg --export --armor youremail@provider.example | clip.exe
```

You can upload your public key to GitHub via your [settings page](https://github.com/settings/keys) under the GPG keys section.

## Node / NPM

We have a couple of options available for installing Node and NPM. If you need to switch between multiple versions, I highly recommend using NVM. If you just want the latest version available for the Ubuntu distribution of Linux (without an easy method of switching), skip down to the Apt section below.

### NVM

These instructions were pulled from the [NVM README](https://github.com/nvm-sh/nvm). Feel free to check out the instructions there if you want more details. Otherwise, run the following commands to get set up with the latest version of Node and NPM.

```bash
# install nvm (latest version at time of writing)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

# reload the .bashrc file
source ~/.bashrc

# install the latest version of node
nvm install node
```

### Apt

This installs Node from the Ubuntu package repositories. The latest version available through Ubuntu might not be the latest version available through other means.

```bash
sudo apt install -y nodejs
```

## Docker

Download and install [Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows). To enable Docker for WSL 2, make sure the **Install required Windows components for WSL 2** option is checked. Log out and log back in to finish the installation.

## Text Editor

Using a traditional text editor with the WSL will require some extra configuration depending on the one you choose.

### Atom

Launching Atom from within WSL is not as simple as you might think. The `atom` binary needs to be executed in a Windows `cmd` context, and it needs the _Windows_ path of the specified directory instead of the Linux path. I created a [little helper script](https://gist.github.com/voraciousdev/1a1473ea36906c8f6830a17701e7fd21) to do exactly that. Download it to the `/usr/local/bin` directory and make it executable by running the following commands.

```bash
# download the atom script
sudo curl -o /usr/local/bin/atom https://gist.githubusercontent.com/voraciousdev/1a1473ea36906c8f6830a17701e7fd21/raw/b8c697ca810022f2fc4be9eef3f72a54c6073b7e/atom.sh

# make it executable
sudo chmod +x /usr/local/bin/atom
```

Now the `atom` command can be run from within WSL to open the app on Windows. It is worth mentioning that this does not implement full `atom` argument support at the moment. This script only accepts a single, optional path argument for the time being. Here are a few examples of how to use it.

```bash
# open the current directory
atom .

# open another directory
atom ~/workspace/project

# open atom without specifying a project
atom
```

### VS Code

Download and install [VS Code](https://code.visualstudio.com/). When you open VS Code for the first time, it will prompt you to install recommended extensions. One of the recommended extensions will be [Remote Development](https://aka.ms/vscode-remote/download/extension). Here are a few examples of how to use the new `code` command from the WSL terminal.

```bash
# open the current directory
code .

# open another directory
code ~/workspace/project

# open vscode without specifying a project
code
```

## Closing

If you think something is missing from this article, please let me know. I am happy to update it with other common web dev tools. As always, thank you for reading!
