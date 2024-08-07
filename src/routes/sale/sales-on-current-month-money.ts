import { FastifyInstance } from 'fastify'
import { queryDatabase } from '../../baseQuery'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware'
import { DbOptions } from '../../FIREBIRD/connection'
import { getDataBaseOptions } from '../../utils/get-database-path'

//* * Retorna o total de receita das vendas feitas no mês atual */

export const SalesOnCurrentMonthMoney = async (app: FastifyInstance) => {
  app.get(
    '/sales-on-current-month-money',
    app.addHook('preValidation', AuthMiddleware),
    async (req, reply) => {
      const dbUserptions = (await getDataBaseOptions(
        req.headers.authorization,
      )) as DbOptions

      try {
        const sql = `
			SELECT SUM(total) as TOTAL
			FROM pedi_vend
			WHERE 
				EXTRACT(MONTH FROM data) = EXTRACT(MONTH FROM CURRENT_DATE)
				AND EXTRACT(YEAR FROM data) = EXTRACT(YEAR FROM CURRENT_DATE)
			`

        const result = await queryDatabase(sql, dbUserptions)
        return reply.status(200).send(result)
      } catch (error) {
        console.error('Error:', error)
      }
    },
  )
}
