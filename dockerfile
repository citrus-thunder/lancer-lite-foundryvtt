FROM node:16
ARG FOUNDRY_URL

WORKDIR /temp

# Option 1: Provide CLI arg FOUNDRY_URL={url}
#  - URL can be retrieved from Foundry website in account information
#  - URL is temporary (5 mins)
#RUN curl ${FOUNDRY_URL} -o foundry.zip

# Option 2: Provide foundry.zip directly
#  - Place foundry.zip file in same directory as this file
COPY foundry.zip .

WORKDIR /app/foundry
RUN unzip /temp/foundry.zip

RUN rm /temp/foundry.zip

WORKDIR /app/data/Data/systems
COPY lancer-lite/ .

WORKDIR /app/foundry/

# Recommended: Set /app/data to a volume in CLI or docker-compose
ENTRYPOINT ["node", "resources/app/main.js", "--dataPath=/app/data"]