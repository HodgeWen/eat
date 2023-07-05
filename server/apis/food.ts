import fastify, {
  FastifyPluginCallback,
  FastifyRegister,
  FastifyRegisterOptions,
  RouteHandlerMethod,
  RouteShorthandMethod
} from 'fastify'
import { prisma } from '../utils/db'

app.get<{
  Querystring: PageQuery
}>('/food/type/page', async (req, res) => {
  const { page = 1, size = 20 } = req.query
  const ret = await prisma.foodType.findMany({
    skip: (+page - 1) * +size,
    take: +size
  })
  const count = await prisma.foodType.count()
  res.send({
    data: {
      result: ret,
      total: count
    },
    message: '成功'
  })
})

type ModuleName = 'food' | 'foodType'

type Handler = RouteShorthandMethod

type Features<M> = Record<
  string,
  {
    get?: RouteHandlerMethod
    post?: RouteHandlerMethod
    put?: RouteHandlerMethod
    delete?: RouteHandlerMethod
    patch?: RouteHandlerMethod
  }
>

function router<const ModuleName>(
  moduleName: ModuleName,
  features: Features<ModuleName>
): Parameters<FastifyRegister> {
  return [() => {}]
}

const handlers = {
  page<const M extends string>(m: M, cb?: any) {
    return async (req: any, reply: any) => {
      prisma.food
      await (prisma as any)[m].findMany({

      })
    }
  }
}


const cb: FastifyPluginCallback = (app, _, done) => {
  app.get('/page', handlers.page(''))
}

export default [
  {},
  {
    prefix: '/food'
  }
]
