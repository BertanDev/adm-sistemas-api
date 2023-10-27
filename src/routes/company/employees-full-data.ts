import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o codigo ,nome, salário, data de admissão de todos os funcionários  */

export const EmployeesFullData = async (app: FastifyInstance) => {
	app.get('/employees-full-data', async (_, reply) => {
		try {
			const sql = 'SELECT codi, nome, data_admi, sala_fixo from FUNC'

			const result = await queryDatabase(sql)
			return reply.status(200).send(result)
		  } catch (error) {
			console.error('Error:', error);
			return reply.status(500).send({ error: 'Internal Server Error' });
		  }
	})
}

