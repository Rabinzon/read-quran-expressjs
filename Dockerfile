FROM mhart/alpine-node:6
WORKDIR /src
ADD . /src
RUN npm i

CMD ["npm", "start"]
