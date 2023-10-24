import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o valor total de títulos a receber em aberto do mês atual */

export const TotalReceivableCurrentMonth = async (app: FastifyInstance) => {
	app.get('/total-receivable-current-month', async (_, reply) => {
		try {
			const sql = `
			SELECT SUM(sald) as TOTAL
			FROM titur
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

