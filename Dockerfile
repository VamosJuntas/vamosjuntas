FROM node:0.12.9
ADD . /code
WORKDIR /code
RUN npm install && \
  npm install -g bower && \
  npm install -g karma-cli && \
  npm install -g cordova ionic ios-sim
