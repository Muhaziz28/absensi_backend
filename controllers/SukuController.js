import { Op } from "sequelize"
import Suku from "../models/SukuModel.js"
import payload from "../response_format.js"

export const getAllSuku = async (req, res) => {
    try {
        let suku
        let search = req.query.search
        if (search) {
            suku = await Suku.findAll({
                where: {
                    nama_suku: {
                        [Op.like]: `%${search}%`
                    }
                }
            })
            if (suku.length === 0) return payload(400, false, "Suku not found", null, res)

            return payload(200, true, "All suku", suku, res)
        } else {
            suku = await Suku.findAll()
            return payload(200, true, "All suku", suku, res)
        }
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createSuku = async (req, res) => {
    try {
        const { nama_suku } = req.body
        const checkNamaSuku = await Suku.findOne({ where: { nama_suku } })
        if (checkNamaSuku) return payload(400, false, "Suku already exist", null, res)

        await Suku.create({ nama_suku })
        return payload(200, true, "Suku created", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}