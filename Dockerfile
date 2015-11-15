FROM ubuntu

RUN apt-get update
RUN apt-get install -y nodejs-legacy npm

COPY . /
RUN pwd
RUN npm install

CMD npm start

EXPOSE 3023