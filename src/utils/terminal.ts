import { red, yellow } from 'colorette'

export const displayGptMessage = (message = '', tokensUsed = 0, totalSpent = 0) => {
  if (!message) {
    console.log(red('GPT could not return a valid message'))
    process.exit()
  }

  console.log('----------------------------')
  console.log(yellow('GPT response:'))
  console.log(message)

  console.log('----------------------------')
  console.log(yellow('GPT usage:'))
  console.log(`Used a total of ${tokensUsed} tokens with an approximate cost of $${totalSpent}`)
}
