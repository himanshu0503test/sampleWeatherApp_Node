FROM ubuntu:14.04
MAINTAINER Himanshu Aggarwal <hemanshu0503@gmail.com>
RUN apt-get update
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN apt-get -y install node-express
RUN ln -s /usr/bin/nodejs /usr/bin/node
COPY . /src
RUN cd /src && npm install
# RUN npm install
#RUN node /src/app.js
EXPOSE 3000

