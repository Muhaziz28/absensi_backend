import payload from "../response_format.js"
import Pangkat from "../models/PangkatModel.js";
import { Op } from "sequelize";

export const getAllPangkat = async (req, res) => {
    try {
        let pangkat
        const { search } = req.query
        if (search) {
            pangkat = await Pangkat.findAll({
                attributes: {
                    exclude: ["created_at", "updated_at"]
                },
                where: {
                    nama_pangkat: {
                        [Op.like]: `%${search}%`
                    }
                }
            })
        } else {
            pangkat = await Pangkat.findAll({
                attributes: {
                    exclude: ["created_at", "updated_at"]
                }
            })
        }
        return payload(200, true, "All pangkat", pangkat, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createPangkat = async (req, res) => {
    try {
        const { nama_pangkat } = req.body

        const checkPangkat = await Pangkat.findOne({ where: { nama_pangkat } })
        if (checkPangkat) return payload(400, false, "Pangkat sudah ada", null, res)

        await Pangkat.create({ nama_pangkat })
        return payload(200, true, "Pangkat created", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updatePangkat = async (req, res) => {
    try {
        const { id } = req.params
        const { nama_pangkat } = req.body
        const pangkat = await Pangkat.update(
            { nama_pangkat },
            {
                where: { id }
            })
        if (!pangkat) return payload(400, false, "Pangkat not found", null, res)
        return payload(200, true, "Pangkat updated", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const deletePangkat = async (req, res) => {
    try {
        const { id } = req.params
        const pangkat = await Pangkat.destroy({ where: { id } })
        if (pangkat === 0) return payload(400, false, "Pangkat not found", null, res)
        return payload(200, true, "Pangkat deleted", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}