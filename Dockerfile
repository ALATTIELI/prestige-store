FROM node:16.17-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]


### Copy the build folder to the caddy server
# FROM caddy:2.6.2-alpine

# # COPY ./Caddyfile.local /etc/caddy/Caddyfile

# COPY --from=builder /usr/src/app/build /srv/client-app