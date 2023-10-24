import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o valor total de títulos a pagar em aberto do mês atual */

export const TotalToPayCurrentMonth = async (app: FastifyInstance) => {
	app.get('/total-to-pay-current-month', async (_, reply) => {
		try {
			const sql = `
			SELECT SUM(sald) as TOTAL
			FROM titup
			WHERE 
				EXTRACT(MONTH FROM venc) = EXTRACT(MONTH FROM CURRENT_DATE)
				AND EXTRACT(YEAR FROM venc) = EXTRACT(YEAR FROM CURRENT_DATE)
			`
			const result = await queryDatabase(sql)
			return reply.status(200).send(result)
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}

