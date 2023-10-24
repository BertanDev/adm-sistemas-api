import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o balanço entre os titulos a pagar e a receber */

export const TotalBalance = async (app: FastifyInstance) => {
	app.get('/total-balance', async (_, reply) => {
		try {
			let sql = `
			select sum(sald) as TOTAL from titur
			`
			const totalTituR = await queryDatabase(sql) as {TOTAL: number}

			sql = `
			select sum(sald) as TOTAL from titup
			`

			const totalTituP = await queryDatabase(sql) as {TOTAL: number}

			const result = totalTituR.TOTAL - totalTituP.TOTAL
			return reply.status(200).send({TOTAL: result})
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}
