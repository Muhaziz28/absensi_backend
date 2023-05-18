import RiwayatPendidikan from "../models/RiwayatPendidikanModel.js"
import payload from "../response_format.js"
import jwt from "jsonwebtoken"

export const getMyRiwayatPendidikan = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return payload(401, false, "Unauthorized", null, res)

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const riwayatPendidikan = await RiwayatPendidikan.findAll({
            where: { user_id: id },
            attributes: {
                exclude: ["user_id", "createdAt", "updatedAt"],
            }
        })

        return payload(200, true, "Data riwayat pendidikan", riwayatPendidikan, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createRiwayatPendidikan = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return payload(401, false, "Unauthorized", null, res)

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const { jenjang, nama_pendidikan, tahun_masuk, tahun_lulus, gelar } = req.body
        await RiwayatPendidikan.create({
            user_id: id,
            jenjang,
            nama_pendidikan,
            tahun_masuk,
            tahun_lulus,
            gelar
        })

        return payload(200, true, "Riwayat pendidikan berhasil ditambahkan", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updateRiwayatPendidikan = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return payload(401, false, "Unauthorized", null, res)

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const riwayatPendidikan = await RiwayatPendidikan.findOne({
            where: { id: req.params.id }
        })
        if (!riwayatPendidikan) return payload(404, false, "Riwayat pendidikan tidak ditemukan", null, res)

        const { jenjang, nama_pendidikan, tahun_masuk, tahun_lulus, gelar } = req.body
        await RiwayatPendidikan.update({
            jenjang,
            nama_pendidikan,
            tahun_masuk,
            tahun_lulus,
            gelar
        }, {
            where: { id: req.params.id }
        })

        return payload(200, true, "Riwayat pendidikan berhasil diupdate", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const deleteRiwayatPendidikan = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return payload(401, false, "Unauthorized", null, res)

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const riwayatPendidikan = await RiwayatPendidikan.findOne({
            where: { id: req.params.id }
        })
        if (!riwayatPendidikan) return payload(404, false, "Riwayat pendidikan tidak ditemukan", null, res)

        await RiwayatPendidikan.destroy({
            where: { id: req.params.id }
        })

        return payload(200, true, "Riwayat pendidikan berhasil dihapus", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}