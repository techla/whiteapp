ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine
ENV WORKDIR /opt/webapp
WORKDIR $WORKDIR
RUN apk update && apk upgrade && apk add bash
COPY ./package.json ${WORKDIR}
COPY ./dist ${WORKDIR}
COPY ./entrypoint.sh ${WORKDIR}
RUN ["chmod", "+x", "/opt/webapp/entrypoint.sh"]

RUN yarn install --production

ENTRYPOINT ["./entrypoint.sh"]
