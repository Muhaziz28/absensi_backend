import payload from "../response_format.js";
import SatuanKerja from "../models/SatuanKerjaModel.js";

export const getAllSatuanKerja = async (req, res) => {
    try {
        const satuanKerja = await SatuanKerja.findAll()
        return payload(200, true, "Berhasil mendapatkan data satuan kerja", satuanKerja, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createSatuanKerja = async (req, res) => {
    try {
        const satuanKerja = await SatuanKerja.create(req.body)
        return payload(200, true, "Berhasil menambahkan data satuan kerja", satuanKerja, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updateSatuanKerja = async (req, res) => {
    try {
        const satuanKerja = await SatuanKerja.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return payload(200, true, "Berhasil mengubah data satuan kerja", satuanKerja, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const deleteSatuanKerja = async (req, res) => {
    try {
        const satuanKerja = await SatuanKerja.destroy({
            where: {
                id: req.params.id
            }
        })
        return payload(200, true, "Berhasil menghapus data satuan kerja", satuanKerja, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}