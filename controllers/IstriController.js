import Agama from "../models/AgamaModel.js"
import Istri from "../models/IstriModel.js"
import User from "../models/UserModel.js"
import payload from "../response_format.js"
import jwt from "jsonwebtoken"

export const getDataIstri = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return payload(401, false, "Unauthorized", null, res)
        }
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const istri = await Istri.findAll({
            where: { user_id: id },
            attributes: {
                exclude: ["user_id", "agama_id"]
            },
            include: [
                {
                    model: Agama,
                    attributes: ["id", "agama"]
                }
            ]
        })
        if (istri.length === 0) return payload(404, false, "No data found", null, res)

        return payload(200, true, "Data istri", istri, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const getDataIstriById = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return payload(401, false, "Unauthorized", null, res)
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const getIstriById = await Istri.findOne({
            where: { id: req.params.id },
            attributes: {
                exclude: ["user_id", "agama_id"]
            },
            include: [
                {
                    model: Agama,
                    attributes: ["id", "agama"]
                }
            ]
        })

        if (!getIstriById) return payload(404, false, "No data found", null, res)

        return payload(200, true, "Data istri", getIstriById, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updateDataIstri = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return payload(401, false, "Unauthorized", null, res)
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const getIstriById = await Istri.findOne({
            where: { id: req.params.id },
        })
        if (!getIstriById) return payload(404, false, "No data found", null, res)

        const { nama_istri, tempat_lahir_istri, tanggal_lahir_istri, pendidikan_terakhir_istri, pekerjaan_istri, agama_id } = req.body

        const istri = await Istri.update({
            nama_istri,
            tempat_lahir_istri,
            tanggal_lahir_istri,
            pendidikan_terakhir_istri,
            pekerjaan_istri,
            agama_id
        }, {
            where: { id: req.params.id }
        })

        return payload(201, true, "Data istri berhasil diubah", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createDataIstri = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return payload(401, false, "Unauthorized", null, res)
        const { id } = req.user
        const { nama_istri, tempat_lahir_istri, tanggal_lahir_istri, pendidikan_terakhir_istri, pekerjaan_istri, agama_id } = req.body

        await Istri.create({
            user_id: id,
            nama_istri,
            tempat_lahir_istri,
            tanggal_lahir_istri,
            pendidikan_terakhir_istri,
            pekerjaan_istri,
            agama_id
        })

        return payload(201, true, "Data istri berhasil ditambahkan", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const deleteDataIstri = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return payload(401, false, "Unauthorized", null, res)
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const getIstriById = await Istri.findOne({
            where: { id: req.params.id },
        })
        if (!getIstriById) return payload(404, false, "No data found", null, res)

        const istri = await Istri.destroy({
            where: { id: req.params.id }
        })

        return payload(201, true, "Data istri berhasil dihapus", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}
