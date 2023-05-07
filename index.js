import express from 'express'
import dotenv from 'dotenv'
import RoleRoute from './routes/RoleRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import db from './config/Database.js';
dotenv.config();

// (async () => {
//     await db.sync();
// })();

const app = express()
app.use(express.json())

app.use(RoleRoute)
app.use(AuthRoute)

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`)
})