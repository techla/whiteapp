ARG NODE_VERSION
FROM node:14-alpine
ENV WORKDIR /opt/whiteapp
WORKDIR $WORKDIR
RUN apk update && apk upgrade && apk add bash
COPY ./package.json ${WORKDIR}
COPY ./dist ${WORKDIR}
COPY ./entrypoint.sh ${WORKDIR}
RUN ["chmod", "+x", "/opt/whiteapp/entrypoint.sh"]

RUN yarn install

ENTRYPOINT ["./entrypoint.sh"]
