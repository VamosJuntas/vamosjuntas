FROM node:4.3.1

WORKDIR /code

COPY package.json /code/

RUN npm install && \
  npm install -g \
  npm install -g karma-cli && \
  npm install -g gulp && \
  npm install -g cordova ionic ios-sim

COPY . /code

EXPOSE 8100
CMD ionic serve --address `/sbin/ip route|awk '/scope/ { print $9 }'`
