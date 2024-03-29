import express from 'express'
import cors from  'cors'

import databaseMiddleware from '../utils/mongoose'
import vehiclesController from './modules/vehicles/vehicles.controller'

const app = express()
app.use(express.json())
app.use(cors())

app.use(databaseMiddleware)
app.use('/vehicles',vehiclesController)

app.listen(3001, () => console.log('Server starter on port 3001'))