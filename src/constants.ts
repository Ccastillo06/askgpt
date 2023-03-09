export enum Models {
  CHATGPT = 'gpt-3.5-turbo',
  DAVINCI = 'text-davinci-003',
  CURIE = 'text-curie-001',
  BABBAGE = 'text-babbage-001',
  ADA = 'text-ada-001'
}

export const ASSISTANT_MESSAGES = {
  helpful: `You are a helpful assistant.`,
  concise: `You try to be as concise as possible.`,
  accurate: `You give the most accurate answer you can create.`,
  correct: `You check that what you are answering is correct and don not do use fake data when answering.`
}

export const FULL_ASSISTANT_MESSAGE = `${ASSISTANT_MESSAGES.helpful} ${ASSISTANT_MESSAGES.concise} ${ASSISTANT_MESSAGES.accurate} ${ASSISTANT_MESSAGES.correct}`

export const USER_QUESTION = 'Will you answer all my questions?'
export const ASSITANT_ANSWER = 'Yes, I will answer all your questions. What do you want to know?'

export const TOKENS_IN_INITIAL_MESSAGE = Math.ceil(
  (FULL_ASSISTANT_MESSAGE.length + USER_QUESTION.length + ASSITANT_ANSWER.length) / 4
)
