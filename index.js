import express from 'express'
import dotenv from 'dotenv'
import RoleRoute from './routes/RoleRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import JabatanRoute from './routes/JabatanRoute.js'
import db from './config/Database.js';
dotenv.config();

// (async () => {
//     await db.sync();
// })();

const app = express()
app.use(express.json())

app.use(AuthRoute)
app.use(RoleRoute)
app.use(JabatanRoute)

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`)
})