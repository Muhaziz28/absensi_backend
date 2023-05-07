import payload from "../response_format.js";
import Jabatan from "../models/JabatanModel.js";

export const getAllJabatan = async(req, res) => {
    try {
        const jabatan = await Jabatan.findAll({
            attributes: {
                exclude: ["created_at", "updated_at"]
            }
        })
        return payload(200, true, "All jabatan", jabatan, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createJabatan = async (req, res) => {
    try {
        const { nama_jabatan, kelas_jabatan, tunjangan_kinerja } = req.body
        if (nama_jabatan.length > 1) {
            const checkJabatan = await Jabatan.findOne({ where: { nama_jabatan } })
            if (checkJabatan) return payload(400, false, "Jabatan already exist", null, res)
        }
        const jabatan = await Jabatan.create({
            nama_jabatan,
            kelas_jabatan,
            tunjangan_kinerja
        })
        return payload(200, true, "Jabatan created", jabatan, res)
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

        const jabatan = await Jabatan.findOne({ where: { nama_jabatan } })

        if (jabatan)
            return payload(400, false, "Jabatan already exist", null, res)

        await Jabatan.update({ nama_jabatan, kelas_jabatan, tunjangan_kinerja }, { where: { id } })

        return payload(200, true, "Jabatan updated", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}