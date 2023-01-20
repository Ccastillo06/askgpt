# AskGPT 🤖

This library gives your **Terminal superpowers by connecting it with OpenAI API directly**. It allows you to use a simple command to have a pretty similar response to what you can get with [ChatGPT](https://chat.openai.com/).

## Installation

This library should be installed globally with your preferred package manager:

```bash
npm i -g askgpt
```

After installation, you have to **configure your API KEY** to connect to **OpenAI API**. To do so, follow these steps:

- Sign up to OpenAPI and go to your API Keys screen in https://beta.openai.com/account/api-keys.
- Create a **new secret key**, copy its value and run the command:

```bash
askgpt --config
```

- The terminal prompt will ask for your API key, paste it and press Enter. It will save the key in your local system.
- You are done! Time to use OpenAI features 🚀

## Using OpenAI API

In this version of the library we support `completion` using `text-davinci-003` data model. It's more than enough for precise answers and helping with code.

> The next and soon to come version will allow you to change the model of preference and many more options! 🎊

To use the API directly from your terminal, run this command:

```bash
askgpt -m "how can I commit my files using Git?"
```

And you will receive an output with the answer from OpenAI and an approximate cost of your request (you may be in the free test tier for now so take care about reaching the credit limit!).

**Output example:**

```bash
$ askgpt -m "how can i commit in github?"

Asking GPT...
----------------------------
GPT response:
To commit in Github, you will first need to make changes to an existing file or create a new oand go to the terminal of your repository. Then, use the git add command to add the changes toed. After that, use the git commit -m "<your commit message>" command to commit the changes an
----------------------------
GPT usage:
Used a total of 90 tokens with an approximate cost of $0.0018
```

**And in a screenshot too if you want a visual on what it looks like:**

<img src="https://github.com/Ccastillo06/askgpt/blob/main/askgpt-sample.PNG.png" alt="example" width="500" />
