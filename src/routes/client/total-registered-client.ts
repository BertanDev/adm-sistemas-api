import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o total de clientes cadastrados */

export const TotalRegisteredClient = async (app: FastifyInstance) => {
	app.get('/total-registered-client', async (_, reply) => {
		try {
			const sql = `SELECT COUNT(*) AS TOTAL FROM CLIEFORN WHERE TIPOCAD IN ('A', 'C')`
			const result = await queryDatabase(sql)
			return reply.status(200).send({ data: result })
		  } catch (error) {
			console.error('Error:', error);
			return reply.status(500).send({ error: 'Internal Server Error' });
		  }
	})
}

