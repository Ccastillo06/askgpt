import fastify from 'fastify'
import type { AddressInfo } from 'net'

const app = fastify({ logger: true })
app.get('/', async (request, reply) => {
  return { ping: 'pong' }
})

const start = async () => {
  try {
    await app.listen(8080, '0.0.0.0')
    app.log.info(`server listening on ${(app.server.address() as AddressInfo)?.port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start().finally(() => {
  console.log('Server running')
})
