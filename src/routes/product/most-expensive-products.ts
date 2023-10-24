import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna os dez produtos com o maior custo real */

export const MostExpensiveProducts = async (app: FastifyInstance) => {
	app.get('/most-expensive-products', async (_, reply) => {
		try {
			const sql = 'SELECT codi,  descr FROM prod JOIN prod_custos ON codi = cust_prod_codi ORDER BY cust_custo_real DESC ROWS 10'

			const result = await queryDatabase(sql)
			return reply.status(200).send({ data: result })
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}


