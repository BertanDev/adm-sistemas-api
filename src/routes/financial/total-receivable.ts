import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o valor total de títulos a receber em aberto */

export const TotalReceivable = async (app: FastifyInstance) => {
	app.get('/total-receivable', async (_, reply) => {
		try {
			const sql = `
			select sum(sald) as TOTAL from titur
			`
			const result = await queryDatabase(sql)
			return reply.status(200).send(result)
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}

