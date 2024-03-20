import { FastifyInstance } from 'fastify'
import { queryDatabase } from '../../baseQuery'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware'
import { getDataBaseOptions } from '../../utils/get-database-path'
import { DbOptions } from '../../FIREBIRD/connection'

//* * Retorna o total de clientes por estado de 10 estados */

export const CountClientsPerState = async (app: FastifyInstance) => {
  app.get(
    '/count-clients-per-state',
    app.addHook('preValidation', AuthMiddleware),
    async (req, reply) => {
      const dbUserptions = (await getDataBaseOptions(
        req.headers.authorization,
      )) as DbOptions

      try {
        const sql = `SELECT FIRST 10 COUNT(cf.uf) AS total_registros, cf.uf
        FROM clieforn cf
        WHERE cf.tipocad IN ('C', 'A')  AND cf.uf IS NOT NULL
        GROUP BY cf.uf
        ORDER BY total_registros DESC`
        const result = await queryDatabase(sql, dbUserptions)
        return reply.status(200).send(result)
      } catch (error) {
        console.error('Error:', error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    },
  )
}
