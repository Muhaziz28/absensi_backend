import express from 'express'
import dotenv from 'dotenv'
import RoleRoute from './routes/RoleRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import JabatanRoute from './routes/JabatanRoute.js'
import PangkatRoute from "./routes/PangkatRoute.js";
import AgamaRoute from "./routes/AgamaRoute.js";
import SatuanKerjaRoute from "./routes/SatuanKerjaRoute.js";
import KonfigurasiAbsensiRoute from "./routes/KonfigurasiAbsensiRoute.js";
import SukuRoute from "./routes/SukuRoute.js";
import ProfileRoute from "./routes/ProfileRoute.js"
import IstriRoute from "./routes/IstriRoute.js"
import AnakRoute from "./routes/AnakRoute.js"
import RiwayatPendidikanRoute from "./routes/RiwayatPendidikanRoute.js"
import AbsenRoute from "./routes/AbsenRoute.js"
import PersonilRoute from "./routes/PersonilRoute.js"
import TunjanganRoute from "./routes/TunjanganRoute.js"
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
app.use(PangkatRoute)
app.use(AgamaRoute)
app.use(SatuanKerjaRoute)
app.use(KonfigurasiAbsensiRoute)
app.use(SukuRoute)
app.use(ProfileRoute)
app.use(IstriRoute)
app.use(AnakRoute)
app.use(RiwayatPendidikanRoute)
app.use(AbsenRoute)
app.use(PersonilRoute)
app.use(TunjanganRoute)

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`)
})