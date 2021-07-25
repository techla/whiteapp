ARG NODE_VERSION
FROM node:16-alpine
ENV WORKDIR /opt/whiteapp
WORKDIR $WORKDIR
RUN apk update && apk upgrade && apk add bash
COPY ./package.json ${WORKDIR}
COPY ./dist ${WORKDIR}
COPY ./entrypoint.sh ${WORKDIR}
RUN ["chmod", "+x", "/opt/whiteapp/entrypoint.sh"]

RUN yarn install --production

ENTRYPOINT ["./entrypoint.sh"]
