FROM php:7.4-apache

RUN apt update && apt upgrade -y

RUN apt install -y mariadb-server mariadb-client 
RUN apt-get install -y wget vim git zip unzip zlib1g-dev libzip-dev libpng-dev
RUN docker-php-ext-install -j$(nproc) mysqli pdo_mysql gd zip pcntl exif

ARG DB_LOGIN_A
ARG DB_PASSWORD_A
ARG DB_NAME_A

ENV DB_LOGIN=$DB_LOGIN_A
ENV DB_PASSWORD=$DB_PASSWORD_A
ENV DB_NAME=$DB_NAME_A

COPY ./db.sql /script.sql
RUN mkdir -p /var/www/html
COPY ./WEB/ /var/www/html/
COPY ./script.sh /script.sh

RUN echo "CREATE DATABASE IF NOT EXISTS $DB_NAME;" >> /n-script.sql
RUN echo "USE $DB_NAME;" >> /n-script.sql
RUN echo "SOURCE /script.sql;" >> /n-script.sql
RUN echo "CREATE USER '$DB_LOGIN'@'localhost' IDENTIFIED BY '$DB_PASSWORD';" >> /n-script.sql
RUN echo "GRANT ALL PRIVILEGES ON * . * TO '$DB_LOGIN'@'localhost';" >> /n-script.sql
RUN echo "FLUSH PRIVILEGES;" >> /n-script.sql

RUN service mariadb start && mysql -u root < /n-script.sql

RUN sed -i "s/a_user/$DB_LOGIN/" /var/www/html/config/config.php && sed -i "s/a_db/$DB_NAME/" /var/www/html/config/config.php && sed -i "s/a_pass/$DB_PASSWORD/" /var/www/html/config/config.php

RUN chmod +x /script.sh

RUN rm -rf /var/www/html/index.html

RUN a2enmod rewrite

WORKDIR /var/www

CMD [ "/script.sh" ]