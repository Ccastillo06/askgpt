# AskGPT Telegram Bot 🤖

So you want to have a **personal Telegram bot connected to OpenAI API**? Stay here for 2 minutes and you'll ship your own **fast ⚡**.

Using some of the code created for `askgpt` when launching the CLI, I prepared a ready to use Telegram bot in this same folder. I'll explain how it works and how you can download and run it.

> Disclaimer: Telegram bots can't be private yet but this bot is **just allowing your own Telegram id to ask questions**, any other user id will get declined and wont waste more resources than a simple answer to redirect them to this README 🚔.

<img src="https://raw.githubusercontent.com/Ccastillo06/askgpt/main/assets/telegram-bot.gif" alt="example" width="500" />

## Preparing the bot server locally 👾

To create a Telegram bot, go to the app and open a chat with `@BotFather`.

Run the command `/newbot` and add a **name to it** by following the prompts that appear. You'll eventually get a `Telegram Bot Token` to run your own bot.

Now look for your bot in Telegram the same way you did with `@BotFather` and open a conversation with it.

Time to open the repository, clone this very same repo and install dependencies locally. Now add an `.env` file in the root of the project, copy the contents from `.env.dist` and add your own variables:

```
TELEGRAM_BOT_TOKEN= # Telegram bot token
OPEN_AI_API_TOKEN= # Your API Key from OPEN AI
USER_TELEGRAM_ID=XXXXXXXXXX # You can pick this from the @userinfobot in Telegram, or the URL number from your Saved Messages channel
MAX_TOKENS_PER_REQUEST=500 # Set the max. tokens you wish to use per request
```

> You can now run the bot locally with `npm run dev:tgbot`, if you set everything up properly you will get an answer to a question using OpenAI Davinci API 🔥.

## Launching the server in production 🚀

You got it running already in you own computer and think it's time to deploy your own server? I'll explain how to do that with [Fly.io](https://fly.io/) as it has an easy and fast CLI tool to deploy a server almost instantly with a generous for free tier.

> Before starting the server deployment, [install flyctl](https://fly.io/docs/hands-on/install-flyctl/) CLI and login with your terminal.

Now navigate to the root of this same repo with your terminal and run `flyctl launch`. Setup an app with a proper name, in the nearest region to you, without databases and **don't deploy it directly in the last step**.

To get the bot running you'll need to run a specific npm command different from `start` or `dev`. Additionally, you'll need to setup the env variables in your Fly app directly. Let's get to that! 🤘

1. Setup the environment variables for your server with:

```
flyctl secrets set TELEGRAM_BOT_TOKEN={YOUR_TOKEN} OPEN_AI_API_TOKEN={YOUR_TOKEN} USER_TELEGRAM_ID={YOUR_ID} MAX_TOKENS_PER_REQUEST=500
```

If the command starts a deploy as sideeffect, cancel it with `Ctrl + C` or `Cmd + C`.

2. Edit the `Dockerfile` that **flyctl** created for you and change these lines:

```bash
# Change from this:
RUN npm install && npm run build
# To this (it will install some dev dependencies to build the project properly):
RUN npm install --production=false && npm run build:tgbot

# Also change from this:
CMD [ "npm", "run", "start" ]
# To this (it will run the bot with the correct command)
CMD [ "npm", "run", "start:tgbot" ]
```

3. Add these three folders to your `.dockerignore` file to not bloat the deployment server:

```
.github
assets
src
```

4. Everything is ready! Last step, deploy the server. Run `flyctl deploy` and see how your bot goes live! 🚀

- If the bot has a weird error due to duplicated instances and it does not get fixed automatically with the deployment, run `flyctl apps restart <YOUR_APP_NAME>` and that should fix it.
