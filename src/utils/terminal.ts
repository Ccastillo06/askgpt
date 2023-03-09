import { red, yellow } from 'colorette'

export const displayGptMessage = (message = '', tokensUsed = 0, totalSpent = 0) => {
  if (!message) {
    console.log(red('GPT API could not return a valid message'))
    process.exit()
  }

  console.log('----------------------------')
  console.log(yellow('askGPT chosen response:'))
  console.log(message)

  console.log('----------------------------')
  console.log(yellow('API usage:'))
  console.log(`Used a total of ${tokensUsed} tokens with an approximate cost of $${totalSpent}`)
}
