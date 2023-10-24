import fastify from 'fastify'
import { routes } from './routes'
import cors from '@fastify/cors'

const app = fastify()
app.register(cors, {})
app.register(routes)

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

export { app }