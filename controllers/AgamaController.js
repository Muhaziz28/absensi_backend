import { Op } from "sequelize";
import Agama from "../models/AgamaModel.js";
import payload from "../response_format.js";

export const getAllAgama = async (req, res) => {
    try {
        const search = req.query.search
        let agama
        if (search) {
            agama = await Agama.findAll({
                where: {
                    agama: { [Op.like]: `%${search}%` }
                }
            })
        } else {
            agama = await Agama.findAll()
        }
        return payload(200, true, "Agama data", agama, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createAgama = async (req, res) => {
    try {
        const { agama } = req.body
        if (!agama) return payload(400, false, "Please fill all fields", null, res)

        await Agama.create({ agama })
        return payload(200, true, "Agama created", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updateAgama = async (req, res) => {
    try {
        const { id } = req.params
        const { agama } = req.body
        if (!agama) return payload(400, false, "Please fill all fields", null, res)

        const agamaExist = await Agama.findOne({ where: { id } })
        if (!agamaExist) return payload(400, false, "Agama not found", null, res)

        await Agama.update({ agama }, { where: { id } })
        return payload(200, true, "Agama updated", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const deleteAgama = async (req, res) => {
    try {
        const { id } = req.params

        const agamaExist = await Agama.findOne({ where: { id } })
        if (!agamaExist) return payload(400, false, "Agama not found", null, res)

        await Agama.destroy({ where: { id } })
        return payload(200, true, "Agama deleted", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}