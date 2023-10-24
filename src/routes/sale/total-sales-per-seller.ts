import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o total de vendas feitas por cada vendedor  */

export const TotalSalesPerSeller = async (app: FastifyInstance) => {
	app.get('/total-sales-per-seller', async (request, reply) => {
		const { func_code } = request.query as {func_code: number}

		try {
			const sql = `select
			EXTRACT(MONTH FROM data) AS mes,
			EXTRACT(YEAR FROM data) AS ano,
				count(*)
			from pedi_vend
			WHERE
				c_func = ${func_code} and data >= CURRENT_DATE - 365
			GROUP BY 
				mes, ano
			ORDER BY 
				ano , mes `

			const result = await queryDatabase(sql)
			return reply.status(200).send(result)
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}


