import Agama from "../models/AgamaModel.js"
import Anak from "../models/AnakModel.js"
import User from "../models/UserModel.js"
import payload from "../response_format.js"
import jwt from "jsonwebtoken"

export const getDataAnak = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return payload(401, false, "Unauthorized", null, res)
        }
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const anak = await Anak.findAll({
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
        if (anak.length === 0) return payload(404, false, "No data found", null, res)

        return payload(200, true, "Data anak", anak, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const getDataAnakById = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return payload(401, false, "Unauthorized", null, res)
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const getAnakById = await Anak.findOne({
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

        if (!getAnakById) return payload(404, false, "No data found", null, res)

        return payload(200, true, "Data anak", getAnakById, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updateDataAnak = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return payload(401, false, "Unauthorized", null, res)
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const getAnakById = await Anak.findOne({
            where: { id: req.params.id },
        })
        if (!getAnakById) return payload(404, false, "No data found", null, res)

        const { nama_anak, anak_ke, jenis_kelamin_anak, tempat_lahir_anak, tanggal_lahir_anak, pendidikan_terakhir_anak, pekerjaan_anak, agama_id } = req.body

        const anak = await Anak.update({
            nama_anak,
            anak_ke,
            jenis_kelamin_anak,
            tempat_lahir_anak,
            tanggal_lahir_anak,
            pendidikan_terakhir_anak,
            pekerjaan_anak,
            agama_id
        }, {
            where: { id: req.params.id }
        })

        return payload(201, true, "Data anak berhasil diubah", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createDataAnak = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return payload(401, false, "Unauthorized", null, res)
        const { id } = req.user

        const { nama_anak, anak_ke, jenis_kelamin_anak, tempat_lahir_anak, tanggal_lahir_anak, pendidikan_terakhir_anak, pekerjaan_anak, agama_id } = req.body

        const anak = await Anak.create({
            user_id: id,
            nama_anak,
            anak_ke,
            jenis_kelamin_anak,
            tempat_lahir_anak,
            tanggal_lahir_anak,
            pendidikan_terakhir_anak,
            pekerjaan_anak,
            agama_id
        })

        return payload(201, true, "Data anak berhasil ditambahkan", anak, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const deleteDataAnak = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return payload(401, false, "Unauthorized", null, res)
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const getAnakById = await Anak.findOne({
            where: { id: req.params.id },
        })
        if (!getAnakById) return payload(404, false, "No data found", null, res)

        const anak = await Anak.destroy({
            where: { id: req.params.id }
        })

        return payload(201, true, "Data anak berhasil dihapus", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}