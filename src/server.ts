import fastify from 'fastify'
import cors from '@fastify/cors'

import { routes } from './routesManager'

const app = fastify()

app.register(cors, {})
app.register(routes)

const PORT = 3000

app.listen(PORT, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server listening in port ${PORT}`)
})

export { app }

module.exports = {
  app
}