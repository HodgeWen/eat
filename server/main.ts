import Fastify from 'fastify'

import { Sequelize } from '@sequelize/core'
import { User } from './models/user'

const fastify = Fastify({
  logger: true
})

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  models: [User]
})

const users = await User.findAll({})

// fastify.register(
//   (app, _, done) => {
//     // 食物类别
//     app.get('/food/type', async (req, res) => {
//       const ret = await prisma.foodType.findMany({})

//       res.send(ret)
//     })

//     app.get<{
//       Querystring: {
//         page: string
//         size: string
//       }
//     }>('/food/type/page', async (req, res) => {
//       const { page = 1, size = 20 } = req.query
//       const ret = await prisma.foodType.findMany({
//         skip: (+page - 1) * +size,
//         take: +size
//       })
//       const count = await prisma.foodType.count()
//       res.send({
//         data: {
//           result: ret,
//           total: count
//         },
//         message: '成功'
//       })
//     })

//     app.post<{
//       Body: { name: string }
//     }>('/food/type', async (req, res) => {
//       const item = await prisma.foodType.findFirst({
//         where: {
//           name: req.body.name
//         }
//       })
//       if (item) {
//         res.code(400)
//         return res.send({
//           msg: `name字段值:${req.body.name} 重复`
//         })
//       }
//       const ret = await prisma.foodType.create({
//         data: req.body
//       })
//       res.send({ msg: '成功', data: ret })
//     })

//     app.put<{
//       Body: { name: string }
//       Params: {
//         id: string
//       }
//     }>('/food/type/:id', async (req, res) => {
//       const ret = await prisma.foodType.update({
//         data: req.body,
//         where: {
//           id: +req.params.id
//         }
//       })

//       res.send({ msg: '成功', data: ret })
//     })

//     app.delete<{
//       Params: {
//         id: string
//       }
//     }>('/food/type/:id', async (req, res) => {
//       const ret = await prisma.foodType.delete({
//         where: {
//           id: +req.params.id
//         }
//       })
//       res.send({
//         msg: '成功',
//         data: ret
//       })
//     })

//     // 食物
//     app.get('/food', async (req, res) => {
//       const ret = await prisma.food.findMany({})

//       res.send(ret)
//     })

//     app.get<{
//       Querystring: {
//         page: string
//         size: string
//       }
//     }>('/food/page', async (req, res) => {
//       const { page = 1, size = 20 } = req.query
//       const ret = await prisma.food.findMany({
//         skip: (+page - 1) * +size,
//         take: +size
//       })
//       const count = await prisma.food.count()
//       res.send({
//         data: {
//           result: ret,
//           total: count
//         },
//         message: '成功'
//       })
//     })

//     app.post<{
//       Body: { name: string; foodType: string }
//     }>('/food', async (req, res) => {
//       const item = await prisma.food.findFirst({
//         where: {
//           name: req.body.name
//         }
//       })
//       if (item) {
//         res.code(400)
//         return res.send({
//           msg: `name字段值:${req.body.name} 重复`
//         })
//       }
//       const ret = await prisma.food.create({
//         data: req.body
//       })
//       res.send({ msg: '成功', data: ret })
//     })

//     app.put<{
//       Body: { name: string; foodType: string }
//       Params: {
//         id: string
//       }
//     }>('/food/:id', async (req, res) => {
//       const ret = await prisma.food.update({
//         data: req.body,
//         where: {
//           id: +req.params.id
//         }
//       })

//       res.send({ msg: '成功', data: ret })
//     })

//     app.delete<{
//       Params: {
//         id: string
//       }
//     }>('/food/:id', async (req, res) => {
//       const ret = await prisma.food.delete({
//         where: {
//           id: +req.params.id
//         }
//       })
//       res.send({
//         msg: '成功',
//         data: ret
//       })
//     })

//     done()
//   },
//   {
//     prefix: '/api'
//   }
// )

await fastify
  .listen({
    port: 2000
  })
  .then(async () => {
    await sequelize.authenticate()
  })
  .catch(err => {
    fastify.log.error(err)
    process.exit(1)
  })
