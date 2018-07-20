FROM node:10.6.0

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ENV PATH=node_modules/.bin:$PATH

CMD ["./run-build.sh"]