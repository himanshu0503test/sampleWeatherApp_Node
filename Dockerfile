FROM ubuntu:14.04
MAINTAINER Himanshu Aggarwal <hemanshu0503@gmail.com>
COPY . /src
RUN cd /src
# RUN npm install
#RUN node /src/app.js
EXPOSE 3000

