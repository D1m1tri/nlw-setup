import Fastify from 'fastify'
import cors from '@fastify/cors'
import {appRoutes} from './routes'

const app = Fastify()

app.register(cors)
app.register(appRoutes)


app.listen(3333, '192.168.0.5', (err) =>{
	if (err) throw err
	console.log(`server listening on ${app.server.address().address}:${app.server.address().port}`)
})
