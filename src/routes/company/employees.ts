import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";
import { readConfig } from "../../FIREBIRD/readConfig";

//** Retorna o codigo e nome de todos os funcionários  */

export const Employees = async (app: FastifyInstance) => {
	app.get('/employees', async (_, reply) => {
		try {
			readConfig('BASE')
			const sql = 'SELECT codi, nome from FUNC'

			const result = await queryDatabase(sql)
			return reply.status(200).send(result)
		  } catch (error) {
			console.error('Error:', error);
			return reply.status(500).send({ error: 'Internal Server Error' });
		  }
	})
}

