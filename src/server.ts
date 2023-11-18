import fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from './routesManager'

const app = fastify()

app.register(cors, {})
app.register(routes)


app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server listening at ${address}`)
})

export { app }

module.exports = {
  app
}