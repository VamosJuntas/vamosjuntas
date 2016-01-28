FROM node:0.12.9
ADD . /code
WORKDIR /code
RUN npm install && \
  npm install -g bower && \
  npm install -g karma-cli && \
  npm install -g cordova ionic ios-sim && \
  bower install --allow-root
EXPOSE 8100:8100
CMD ionic serve --address `/sbin/ip route|awk '/scope/ { print $9 }'`
