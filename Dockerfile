FROM ubuntu

RUN apt-get update
RUN apt-get install -y nodejs-legacy npm

RUN npm install

CMD npm start