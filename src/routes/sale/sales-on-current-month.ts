import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o total de vendas feitas no mês atual */

export const SalesOnCurrentMonth = async (app: FastifyInstance) => {
	app.get('/sales-on-current-month', async (request, reply) => {
		try {
			const sql = `
			SELECT COUNT(*) as TOTAL
			FROM pedi_vend
			WHERE 
				EXTRACT(MONTH FROM data) = EXTRACT(MONTH FROM CURRENT_DATE)
				AND EXTRACT(YEAR FROM data) = EXTRACT(YEAR FROM CURRENT_DATE)
			`

			const result = await queryDatabase(sql)
			return reply.status(200).send(result)
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}


