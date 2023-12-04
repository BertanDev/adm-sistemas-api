import fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from './routesManager'

const app = fastify()

app.register(cors, {})
app.register(routes)

const start = async () => {
  try {
      const PORT = process.env.port || 8080;
      await app.listen(PORT,'0.0.0.0', () => console.log('SERVER LISTENING AT PORT : '+ PORT))
  } catch (err) {
    app.log.error(err)
      process.exit(1)
  }
}

start()

export { app }
