import payload from "../response_format.js";
import SatuanKerja from "../models/SatuanKerjaModel.js";
import { or } from "sequelize";

export const getAllSatuanKerja = async (req, res) => {
    try {
        const satuanKerja = await SatuanKerja.findAll({
            order: [
                ["created_at", "DESC"]
            ],
            attributes: {
                exclude: ["created_at", "updated_at"]
            },
        })
        return payload(200, true, "Berhasil mendapatkan data satuan kerja", satuanKerja, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createSatuanKerja = async (req, res) => {
    try {
        const { kode_satuan_kerja, nama_satuan_kerja, email_satuan_kerja, latitude,
            longitude, alamat_web_satuan_kerja, alamat_satuan_kerja, no_telp_satuan_kerja, no_fax_satuan_kerja, kode_pos_satuan_kerja, kode_prov, kode_kab, kode_kec, kode_desa } = req.body

        const checkSatuanKerja = await SatuanKerja.findOne({
            where: {
                nama_satuan_kerja: nama_satuan_kerja
            }
        })
        if (checkSatuanKerja) return payload(400, false, "Satuan kerja sudah terdaftar", null, res)

        const checkKodeSatuanKerja = await SatuanKerja.findOne({
            where: {
                kode_satuan_kerja: kode_satuan_kerja
            }
        })
        if (checkKodeSatuanKerja) return payload(400, false, "Kode satuan kerja sudah terdaftar", null, res)

        await SatuanKerja.create({
            kode_satuan_kerja,
            nama_satuan_kerja,
            email_satuan_kerja,
            latitude,
            longitude,
            alamat_web_satuan_kerja,
            alamat_satuan_kerja,
            no_telp_satuan_kerja,
            no_fax_satuan_kerja,
            kode_pos_satuan_kerja,
            kode_prov,
            kode_kab,
            kode_kec,
            kode_desa
        })

        return payload(200, true, "Berhasil menambahkan data satuan kerja", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updateSatuanKerja = async (req, res) => {
    try {
        const { id } = req.params
        const {
            kode_satuan_kerja,
            nama_satuan_kerja,
            latitude,
            longitude,
            email_satuan_kerja,
            alamat_web_satuan_kerja,
            alamat_satuan_kerja,
            no_telp_satuan_kerja,
            no_fax_satuan_kerja,
            kode_pos_satuan_kerja,
            kode_prov,
            kode_kab,
            kode_kec,
            kode_desa
        } = req.body

        const checkSatuanKerja = await SatuanKerja.findOne({
            where: {
                nama_satuan_kerja: nama_satuan_kerja
            },
        })
        if (checkSatuanKerja) return payload(400, false, "Satuan kerja sudah terdaftar", null, res)

        await SatuanKerja.update({
            kode_satuan_kerja,
            nama_satuan_kerja,
            latitude,
            longitude,
            email_satuan_kerja,
            alamat_web_satuan_kerja,
            alamat_satuan_kerja,
            no_telp_satuan_kerja,
            no_fax_satuan_kerja,
            kode_pos_satuan_kerja,
            kode_prov,
            kode_kab,
            kode_kec,
            kode_desa
        }, {
            where: {
                id: id
            }
        })

        return payload(200, true, "Berhasil mengubah data satuan kerja", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const deleteSatuanKerja = async (req, res) => {
    try {
        const { id } = req.params
        const checkSatuanKerja = await SatuanKerja.findOne({
            where: {
                id: id
            }
        })
        if (!checkSatuanKerja) return payload(400, false, "Satuan kerja tidak ditemukan", null, res)

        await SatuanKerja.destroy({
            where: {
                id: id
            }
        })

        return payload(200, true, "Berhasil menghapus data satuan kerja", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}