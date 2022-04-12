## A Guide to Installing the Windows Subsystem for Linux (WSL) and Windows Terminal

As a developer that typically works on Mac or Linux, you will be disappointed with the out-of-the-box terminal in Windows. Lucky for us, Windows supports a fairly smooth Linux integration called the Windows Subsystem for Linux (or WSL for short). If you are unfamiliar with it, Microsoft has a pretty concise explanation:

> The Windows Subsystem for Linux lets developers run a GNU/Linux environment -- including most command-line tools, utilities, and applications -- directly on Windows, unmodified, without the overhead of a traditional virtual machine or dual-boot setup.

This guide is meant to serve as a quick reference for setting it up yourself (as I recently had to do).

## Overview

This guide is not a comprehensive resource for all available options. Instead, I have made some assumptions to help you get it set up quickly.

- You **do not** want to join the [Windows Insider Program](https://insider.windows.com/getting-started) and install a preview build of Windows.
- You **do** want to upgrade to WSL 2.
- You **do** want to use Ubuntu 20.04 LTS as your Linux distribution.
- You **do** want to use the Windows Terminal app.

### A note about WSL 2 performance

While WSL 2 is more performant than WSL 1 in most cases, there is a specific scenario where it can actually perform worse than WSL 1. This occurs when you are working on files across file systems. Specifically, you will want to make sure you store your project files on the Linux file system instead of the Windows file system (assuming you are using Linux utilities). Microsoft explains this in further detail on [Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/compare-versions).

## Installation

Let's get started!

### Enable WSL 1

We have to first enable WSL 1 before we can upgrade to WSL 2. In PowerShell (as an administrator), run the following command.

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

### Enable the Virtual Machine Platform feature

To enable the Virtual Machine Platform feature (required for WSL 2), run the following command in PowerShell (as an administrator).

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

### Restart your machine

In order to continue the installation of WSL 1 and 2, you will need to restart your machine. This can be done by running the following in PowerShell (as an administrator).

```powershell
Restart-Computer
```

### Update the Linux kernel

The Linux kernel update package is required to upgrade to WSL 2. To download and run the update, I recommend moving into a different directory since the administrator PowerShell dumps you into the `system32` directory. You can accomplish this with the following command in PowerShell (as an administrator).

```powershell
cd ~ ; wget https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi -outfile update.msi ; .\update.msi
```

You will be prompted to finish the WSL update.

### Set WSL 2 as the default

In PowerShell (as an administrator), run the following command to set WSL 2 as the default.

```powershell
wsl --set-default-version 2
```

### Install Ubuntu 20.04 LTS

[Get Ubuntu 20.04 LTS](https://www.microsoft.com/en-us/p/ubuntu-2004-lts/9n6svws3rx71) from Microsoft. You will need to click the "Get" link to open the Microsoft Store. From there, you can click "Install" to download and install the Ubuntu distribution.

### Launch Ubuntu

The Ubuntu 20.04 LTS app should now be easily searchable in your list of Windows apps. Launch the app to finish setup. You will need to provide a username and password.

*Note: If you encounter an error related to virtualization when launching the app, you may need to enable virtualization at the BIOS level.*

### Install Windows Terminal

[Get Windows Terminal](https://aka.ms/terminal) from Microsoft. You will need to click the "Get" link to open the Microsoft Store. From there, you can click "Install" to download and install the app. For more information on Windows Terminal, head over to [Microsoft Docs](https://docs.microsoft.com/en-us/windows/terminal/).

### Set Ubuntu as the default shell

To set Ubuntu as the default terminal in Windows Terminal, you will need to edit the `settings.json` file. To open this, click the dropdown arrow next to the new tab button and click on "Settings" near the bottom of the menu that pops up. The file will look something like this (unnecessary info has been removed).

```json
{
  "defaultProfile": "{a-random-uuid-for-powershell}",
  "profiles": {
    "list": [
      {
        "guid": "{a-random-uuid-for-powershell}",
        "name": "Windows PowerShell"
      },
      {
        "guid": "{a-random-uuid-for-ubuntu}",
        "name": "Ubuntu-20.04"
      }
    ]
  }
}
```

You just need to update the `defaultProfile` property with the UUID for Ubuntu and save the file.

### Use the Linux file system as your default

When you launch Windows Terminal, you _will_ be presented with the Ubuntu shell, but you will be dropped into the Windows file system. As mentioned above, WSL 2 works best when you use the Linux file system. To change your default directory to your Linux user's home directory, you just need to run the following command in the Ubuntu shell (your new default for Windows Terminal).

```shell
echo 'cd ~' >> ~/.bashrc
```

You can change `~` to something else if you would like, but the home directory is usually a safe place to land in.

## Closing

While this isn't necessarily a _short_ article, I believe it is pretty concise. It aggregates information from a few sources to hopefully get you up and running with WSL 2 and Windows Terminal as quickly as possible.