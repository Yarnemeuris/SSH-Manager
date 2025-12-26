# SSH Manager
This is an electron app for Managing your SSH hosts. You can add hosts that authenticate with password or ssh key. When connecting it opens a new terminal. For ssh key authentication it opens the command prompt with ssh. But for password authentication it goes via wsl and sshpass, because I couldn't find another way to add the password to the ssh command.

## installation
There is a zip file on github with the entire project, so you don't need to install it. Just unzip and run the exe. If you want to connect to hosts via password you will also need wsl and sshpass.