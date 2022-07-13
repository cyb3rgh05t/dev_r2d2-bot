FROM node:16.9.1-alpine

LABEL maintainer=cyb3rgh05t
LABEL org.opencontainers.image.source https://github.com/cyb3rgh05t/dev_r2d2-bot

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot

# Install dependencies
RUN apt-get update || : && apt-get install python -y
RUN npm install

COPY . /usr/src/bot

# Start the bot.
CMD ["node", "."]
