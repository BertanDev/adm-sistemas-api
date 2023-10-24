import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o valor total de títulos a pagar em aberto */

export const TotalToPay = async (app: FastifyInstance) => {
	app.get('/total-to-pay', async (_, reply) => {
		try {
			const sql = `
			select sum(sald) as TOTAL from titup
			`
			const result = await queryDatabase(sql)
			return reply.status(200).send(result)
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}

