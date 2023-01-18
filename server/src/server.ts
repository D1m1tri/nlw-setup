import Fastify from 'fastify'
import cors from '@fastify/cors'
import {appRouts} from './routes'

const app = Fastify()

app.register(cors)
app.register(appRouts)


app.listen({
	port: 3333,
}).then(()=>{
	console.log('Server running on localhost with port 3333')
})
