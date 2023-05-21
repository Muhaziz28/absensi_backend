import payload from "../response_format.js";
import Jabatan from "../models/JabatanModel.js";
import { Op } from "sequelize";

export const getAllJabatan = async (req, res) => {
    try {
        let jabatan
        let search = req.query.search
        if (search) {
            jabatan = await Jabatan.findAll({
                attributes: {
                    exclude: ["created_at", "updated_at"]
                },
                where: {
                    nama_jabatan: {
                        [Op.like]: `%${search}%`
                    }
                }
            })
        } else {
            jabatan = await Jabatan.findAll({
                attributes: {
                    exclude: ["created_at", "updated_at"]
                }
            })
        }
        return payload(200, true, "All jabatan", jabatan, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createJabatan = async (req, res) => {
    try {
        const { nama_jabatan, kelas_jabatan, tunjangan_kinerja } = req.body

        const checkJabatan = await Jabatan.findOne({ where: { nama_jabatan } })
        // if (checkJabatan) return payload(400, false, "Jabatan already exist", null, res)

        await Jabatan.create({
            nama_jabatan,
            kelas_jabatan,
            tunjangan_kinerja
        })
        return payload(200, true, "Jabatan created", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updateJabatan = async (req, res) => {
    try {
        const { id } = req.params
        const { nama_jabatan, kelas_jabatan, tunjangan_kinerja } = req.body

        const checkJabatan = await Jabatan.findOne({ where: { id } })
        if (!checkJabatan)
            return payload(400, false, "Jabatan not found", null, res)

        // const jabatan = await Jabatan.findOne({ where: { nama_jabatan } })

        // if (jabatan)
        //     return payload(400, false, "Jabatan already exist", null, res)

        await Jabatan.update({ nama_jabatan, kelas_jabatan, tunjangan_kinerja }, { where: { id } })

        return payload(200, true, "Jabatan updated", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const deleteJabatan = async (req, res) => {
    try {
        const { id } = req.params
        const jabatan = await Jabatan.findOne({ where: { id } })
        if (!jabatan) return payload(400, false, "Jabatan not found", null, res)

        await Jabatan.destroy({ where: { id } })

        return payload(200, true, "Jabatan deleted", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}
