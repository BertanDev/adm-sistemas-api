import { FastifyInstance } from "fastify";
import { queryDatabase } from "../../baseQuery";

//** Retorna o valor final das movimentações do mês, últimos 12 meses */

export const MovementsLastTwelveMonths = async (app: FastifyInstance) => {
	app.get('/movements-last-twelve-months', async (request, reply) => {
		const { cont } = request.query as {cont: number}

		try {
			const sql = `SELECT 
			EXTRACT(MONTH FROM m.data) AS mes,
			EXTRACT(YEAR FROM m.data) AS ano,
			SUM(CASE WHEN pc.tipo = 'C' THEN m.valo ELSE -m.valo END) AS valor_total
			FROM 
				movi m
			JOIN 
				plan_cont pc ON m.oper = pc.codi
			WHERE 
				m.data >= CURRENT_DATE - 365
				and cont = ${cont}
			GROUP BY 
				mes, ano
			ORDER BY 
			ano DESC, mes DESC`
			const result = await queryDatabase(sql)
			return reply.status(200).send(result)
		  } catch (error) {
			console.error('Error:', error);
		  }
	})
}

