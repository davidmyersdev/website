## A Guide to Customizing the Zsh Shell Prompt

![](https://i.imgur.com/nCWDdyi.png)

The goal of this article is to teach you just enough about the shell prompt to make some helpful customizations. 

## What is the shell prompt?

The prompt is the bit of text that shows up in our shells to indicate that we can interact with them. The prompt usually gives us some details about the current shell session such as username, machine name, current directory, and some kind of prompt termination token. An example might look something like this.

```bash
david@macbook /tmp $ 
```

All of this information can be customized through the shell's prompt strings. Each shell has specific escape sequences that must be used. This just means that we have to use different tokens to represent things such as username, color formatting, etc. For the purposes of this article, we will be using [Zsh](https://www.zsh.org/), and we can confirm that is our current shell by running this.

```bash
echo $0 # /bin/zsh
```

### Introducing PS1

The primary prompt string is stored in a variable called `PS1`. There are five prompt strings in total, so the trailing number denotes its responsibility. The primary prompt string is the one that is printed to `stdout` when the shell is waiting for a new command, and it is therefore the one we probably see most frequently. Unlike a typical variable, these prompt strings undergo expansion _every time the prompt is displayed_. This is what allows us to update the displayed path after changing directories, for example. A `PS1` string might look something like this.

```bash
PS1='%n@%m %/ $ ' # david@macbook /tmp $ 
```

We will dive into this more below.

#### Breaking it down

The first thing to note is the use of single quotes `''`. We can use double quotes, but we have to remember to escape all of the expressions that we want to re-evaluate each time the prompt is displayed. Double quoted strings undergo normal expansion and substitution _before_ being stored in a variable, so evaluation would only happen once per shell session rather than once per prompt. It doesn't make a difference for our simple example above, but it starts to matter when we introduce things like variables and shell expressions. More on that later.

Next, let's take a look at each of the escape sequences in our prompt string. The first one is `%n`, and it represents our username. The next escape sequence is `%/`, and it represents the current directory. For these examples, we will assume the username is `david` and the current directory is `/tmp`. For more on Zsh prompt expansion, [check out the docs](http://zsh.sourceforge.net/Doc/Release/Prompt-Expansion.html).

## How do we customize it?

We are going to build our prompt from scratch, so let's start with some basic information. We talked about the `PS1` variable above, but we didn't talk about where it needs to be defined. For Zsh, we will use `~/.zshrc` to set the `PS1` variable. This file is loaded at the beginning of every shell session, so it will ensure our configuration is respected for all sessions and not just the current one. Every shell has a default prompt string, and we can view the raw source by echoing the `PS1` variable (e.g. `echo $PS1`). While we can build on top of the existing one, for the purposes of learning, we are going to build ours from scratch. Add the following to your Zsh config.

```bash
# ~/.zshrc
PS1='$ ' # $ 
```

This prompt does its primary job of telling us the shell is ready for input, but we can make it much more useful. Let's start by adding our username `%n`, our machine name `%m`, and our current directory `%/`.

```bash
# ~/.zshrc
PS1='%n@%m %/ $ ' # david@macbook /tmp $ 
```

That's looking a lot more like what we might expect from a typical shell prompt.

### Adding some color

Now that we have a basic prompt, we can spice it up with some color. To change the color of our prompt, we need to use a new type of sequence. Many modern terminals support 256 colors, and while some of these can be referenced by name, most will need to be referenced by their color code - ranging from 0 to 255. Colors are applied via start and stop sequences indicated by `%F{}` and `%f`, respectively. Let's put this into practice by coloring our current directory red.

```bash
# ~/.zshrc
PS1='%n@%m %F{red}%/%f $ ' # david@macbook /tmp $ 
```

### Adding the current Git branch

Another useful piece of information which is not typically displayed by default is version control. Not all directories are version controlled, so this info will only show up when it is relevant. For this guide, we will use Git, but Zsh actually does [support a few others](http://zsh.sourceforge.net/Doc/Release/User-Contributions.html#vcs_005finfo-Examples). We are going to add the branch name of the current repo to our prompt, and in order to do this, we need to cover a few details about `vcs_info` . It is a framework that ships with Zsh to gather information from various version control systems.

```bash
# ~/.zshrc
autoload -Uz vcs_info # enable vcs_info
precmd () { vcs_info } # always load before displaying the prompt
```

This block is what actually enables and autoloads `vcs_info` before each rendering of the shell prompt. It stores the data in a new variable called `vcs_info_msg_0_`. If we use this variable in our prompt string, it will display some basic info such as our version control system and the current branch (e.g. `(git)-[main]-`). To format this info, we can use `zstyle` like so.

```bash
# ~/.zshrc
zstyle ':vcs_info:*' formats ' %s(%b)' # git(main)
```

The `zstyle` format string has its own tokens that are expanded in the prompt string. The first token `%s` represents the current version control system. The next token `%b` represents the current branch name. For more information on available tokens, [check out the docs](http://zsh.sourceforge.net/Doc/Release/User-Contributions.html#vcs_005finfo-Configuration). Finally, we can combine everything we've learned and add a bit of color to the branch name.

```bash
# ~/.zshrc
autoload -Uz vcs_info # enable vcs_info
precmd () { vcs_info } # always load before displaying the prompt
zstyle ':vcs_info:*' formats ' %s(%F{red}%b%f)' # git(main)

PS1='%n@%m %F{red}%/%f$vcs_info_msg_0_ $ ' # david@macbook /tmp/repo (main) $ 
```

### Final result

![](https://i.imgur.com/nCWDdyi.png)

To summarize, we have learned how to include specific information about our system and shell session, how to display version control status information, and how to apply color to these various pieces of information.

## Closing

I hope this article helped shed some light on the shell prompt syntax. It was a lot of fun to write while experimenting with my own prompt (which you can see at the top of this page). As a final note, I would love to share [octo](https://github.com/writewithocto/octo) - a hackable, offline-first markdown editor for notes, code snippets, and writing that runs entirely in-browser. It's free and open source, and working on it gives me a lot of ideas and inspiration for the articles I write. Thank you, and happy coding. ✌️