import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o codigo, nome e saldo de todas as contas */

export const CashAccount = async (app: FastifyInstance) => {
	app.get('/cash-account', async (_, reply) => {
		try {
			let sql = `
			SELECT
				CODI, NOME, SALD
			FROM CONT
			`
			const cashAccounts = await queryDatabase(sql) as {TOTAL: number}

			return reply.status(200).send(cashAccounts)
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}
