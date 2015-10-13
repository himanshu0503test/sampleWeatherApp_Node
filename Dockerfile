FROM shippable/minv2:latest
MAINTAINER Himanshu Aggarwal <hemanshu0503@gmail.com>
COPY . /src
RUN cd /src
# RUN npm install
#RUN node /src/app.js
EXPOSE 3000

