<h1 align="center">
	P&X - BOTNET
</h1>

<p align="center">
	<b><i>Development repo for educational purpose only (Made for fun)!</i></b><br>
</p>

<p align="center">
	<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/PandeoF1/42-cub3d?color=blueviolet" />
	<img alt="Number of lines of code" src="https://img.shields.io/tokei/lines/github/PandeoF1/42-cub3d?color=blueviolet" />
	<img alt="Code language count" src="https://img.shields.io/github/languages/count/PandeoF1/42-cub3d?color=blue" />
	<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/PandeoF1/42-cub3d?color=blue" />
	<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/PandeoF1/42-cub3d?color=brightgreen" />
</p>

---
## Description :

This is a botnet made for educational purpose only. <br />
Based on http server and c client with cross platform support. <br />
Equiped with 11 methods - Layer 7 and Layer 4 (TCP & UDP). <br />
Based on boostrap frontend. <br />
Using Encom DOME for a nice and clean interface. <br />


Please note that this is a development repo, if you find some bug / segfault... <br />
Please provide a pull request.


Some script are based on random project from internet. <br />
So they are not tested at 100%.

## Setup :

Server :

```
(sudo) apt install apache2 php mariadb-server mariadb-client php php-cli php-fpm php-json php-pdo php-mysql php-zip php-gd  php-mbstring php-curl php-xml php-pear php-bcmath
```

Client :

```
(sudo) apt install gcc make

cd BOT && make

cd url_hider && ./url_hider "your url"

Edit includes/px_botnet.h - stringifer with your url hided
                          - download_url with url of bash script for the auto propagation

make re

If you want to cross compile custom Makefile at line 82 with a "." before "$(cross)" and use : "make everything"
```

## Usage :
Website : (Upload db, configure config/config.php) Default user/pass: test test

## Demo :
![image description](./images/demo.png)

## Tools :
 > - [Makefile](https://github.com/PandeoF1/makefile) <br />

## Sources :
 > - [HTTP_REQUEST - client](https://github.com/odrevet/HTTP-Request)
 > - [ENCOM_GLOBE - server](https://github.com/arscan/encom-globe)

## Collaborators :
 > - [PandeoF1 - Client AND Backend](https://github.com/PandeoF1)
 > - [xxloubexx - Frontend and Backend](https://github.com/xxloubexx)

## (づ｡◕‿‿◕｡)づ :
```
 ██▓███        ▒██   ██▒
▓██░  ██▒      ▒▒ █ █ ▒░
▓██░ ██▓▒      ░░  █   ░
▒██▄█▓▒ ▒       ░ █ █ ▒ 
▒██▒ ░  ░      ▒██▒ ▒██▒
▒▓▒░ ░  ░      ▒▒ ░ ░▓ ░
░▒ ░           ░░   ░▒ ░
░░              ░    ░  
```
