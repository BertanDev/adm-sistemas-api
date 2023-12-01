import fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from './routesManager'

const app = fastify()

app.register(cors, {})
app.register(routes)

const PORT = 3000

if (require.main === module) {
  // called directly i.e. "node app"
  app.listen({ port: PORT }, (err) => {
    if (err) console.error(err)
    console.log('server listening on 3000')
  })
} else {
  // required as a module => executed on aws lambda
  module.exports = app
}

export { app }
