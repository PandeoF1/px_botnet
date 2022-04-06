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
 > - [HTTP_REQUEST](https://github.com/odrevet/HTTP-Request)

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
                ░    ░  
```
