import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o total da receita de vendas feitas no mês anterior  */

export const SalesOnPreviousMonthMoney = async (app: FastifyInstance) => {
	app.get('/sales-on-previous-month-money', async (_, reply) => {
		try {
			const sql = `
			SELECT SUM(total) as TOTAL
			FROM pedi_vend
			WHERE 
				EXTRACT(MONTH FROM data) = EXTRACT(MONTH FROM DATEADD(MONTH, -1, CURRENT_DATE))
				AND EXTRACT(YEAR FROM data) = EXTRACT(YEAR FROM DATEADD(MONTH, -1, CURRENT_DATE))
			`

			const result = await queryDatabase(sql)
			return reply.status(200).send(result)
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}


