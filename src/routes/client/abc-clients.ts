import { FastifyInstance } from 'fastify'
import { queryDatabase } from '../../baseQuery'
import { AuthMiddleware } from '../../middlewares/AuthMiddleware'
import { DbOptions } from '../../FIREBIRD/connection'
import { getDataBaseOptions } from '../../utils/get-database-path'
import dayjs from 'dayjs'

//* Retorna todos os clientes e valor de venda do mesmo em um deteminado período */

export const ABCClients = async (app: FastifyInstance) => {
  app.get(
    '/abc-clients',
    app.addHook('preValidation', AuthMiddleware),
    async (req, reply) => {
      const dbUserptions = (await getDataBaseOptions(
        req.headers.authorization,
      )) as DbOptions

      const { finishDate, initialDate } = req.query as {
        initialDate: string
        finishDate: string
      }

      const formatInitialDate = dayjs(initialDate).format('DD[.]MM[.]YYYY')
      const formatFinishDate = dayjs(finishDate).format('DD[.]MM[.]YYYY')
      try {
        const sql = `
            select cf.codi, cf.nome, sum(pv.total) as TOTAL from pedi_vend pv
            left join clieforn cf ON cf.codi = pv.clie
            where pv.data >= '${formatInitialDate}' and pv.data <= '${formatFinishDate}'
            group by 1, 2
            order by 3 desc
        `

        const result = await queryDatabase(sql, dbUserptions)

        return reply.status(200).send(result)
      } catch (error) {
        console.error('Error:', error)
      }
    },
  )
}
