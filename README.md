<h1 align="center">
	P&X - BOTNET
</h1>

<p align="center">
	<b><i>Development repo for educational purpose only (Made for fun) !</i></b><br>
</p>

<p align="center">
	<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/PandeoF1/px_botnet?color=blueviolet" />
	<img alt="Number of lines of code" src="https://img.shields.io/tokei/lines/github/PandeoF1/px_botnet?color=blueviolet" />
	<img alt="Code language count" src="https://img.shields.io/github/languages/count/PandeoF1/px_botnet?color=blue" />
	<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/PandeoF1/px_botnet?color=blue" />
	<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/PandeoF1/px_botnet?color=brightgreen" />
</p>

---
## Description :

This is a botnet made for educational purpose only. <br />
Based on http server and c client with cross platform support. <br />
Equiped with 11 methods - Layer 7 and Layer 4 (TCP & UDP). <br />
Based on boostrap frontend. <br />
Using Encom DOME for a nice and clean interface. <br />


Please note that this is a development repo, if you find some bug / segfault... <br />
Please provide a pull request / Issues.


Some script are based on random project from internet. <br />
So they are not tested at 100%.

This project is a fork of [Crunchrat](https://github.com/erikbarzdukas/CrunchRAT). <br />
But i have made some changes to make it more usable. <br />
I have remove the C# client to replace it by a C client to make it cross platform and more easly to use. <br />
If you want to use it on windows, you can use the C# client but you will need to adapt the new api. <br />
Or you can try to made a fork/pull requests of this project and adapt it for windows ;p !


## Setup :

Server :

```bash
(sudo) apt install apache2 php mariadb-server mariadb-client php php-cli php-fpm php-json php-pdo php-mysql php-zip php-gd  php-mbstring php-curl php-xml php-pear php-bcmath
(sudo) mkdir /var/www/html
(sudo) mv WEB/* /var/www/html/
       cd ../DB
(sudo) mysql
MYSQL:
	CREATE DATABASE IF NOT EXISTS px_base;
	USE px_base;
	SOURCE db.sql;
	CREATE USER 'px_user'@'localhost' IDENTIFIED BY 'px_pass';
	GRANT ALL PRIVILEGES ON * . * TO 'px_user'@'localhost';
	FLUSH PRIVILEGES;
```
Now configure config/config.php with the same credentials of the mysql part.
(Default user: px_user, pass: px_pass and db: px_base)

Server (Under Docker) (Configuration is inside docker-compose.yml) :
```bash
cd ./DOCKER
make
```
Open bash under docker :
```bash
make bash
```
Go to ip:80

Client :

```
(sudo) apt install gcc make

cd BOT && make

cd url_hider && ./url_hider "your url"

Edit includes/px_botnet.h 
                          - stringifer with your url hided
                          - download_url with url of bash script for the auto propagation

make re

If you want to cross compile, use : "make everything"
```

## Usage :
Website : Default user/pass: test test
Bot: Execute the binaries on the computer of the victim

## Demo :
![image description](./images/demo.png)

## Tools :
 > - [Makefile](https://github.com/PandeoF1/makefile) <br />

## Sources :
 > - [HTTP_REQUEST - client](https://github.com/odrevet/HTTP-Request)
 > - [ENCOM_GLOBE - server](https://github.com/arscan/encom-globe)

## Collaborators :
 > - [PandeoF1 - Client & Backend](https://github.com/PandeoF1)
 > - [xxloubexx - Frontend & Backend](https://github.com/xxloubexx)

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
