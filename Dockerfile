FROM ubuntu

RUN apt-get update
RUN apt-get install -y nodejs-legacy npm

COPY Rest-API-gamification /
RUN pwd
RUN npm install

CMD npm start

EXPOSE 3023