import { FastifyInstance } from 'fastify'
import { queryDatabase } from '../../baseQuery'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware'
import { DbOptions } from '../../FIREBIRD/connection'
import { getDataBaseOptions } from '../../utils/get-database-path'

//* * Retorna o codigo, nome e saldo de todas as contas */

export const CashAccount = async (app: FastifyInstance) => {
  app.get(
    '/cash-account',
    app.addHook('preValidation', AuthMiddleware),
    async (req, reply) => {
      const dbUserptions = (await getDataBaseOptions(
        req.headers.authorization,
      )) as DbOptions

      try {
        const sql = `
			SELECT
				CODI, NOME, SALD
			FROM CONT
			`
        const cashAccounts = (await queryDatabase(sql, dbUserptions)) as {
          TOTAL: number
        }

        return reply.status(200).send(cashAccounts)
      } catch (error) {
        console.error('Error:', error)
      }
    },
  )
}
