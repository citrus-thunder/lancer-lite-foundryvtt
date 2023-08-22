FROM node:16
ARG FOUNDRY_URL

WORKDIR /temp

COPY foundry.zip .

WORKDIR /app/foundry
RUN unzip /temp/foundry.zip

RUN rm /temp/foundry.zip

WORKDIR /app/data/Data/systems
COPY lancer-lite/ .

WORKDIR /app/foundry/

ENTRYPOINT ["node", "resources/app/main.js", "--dataPath=/app/data"]