import payload from "../response_format.js";
import KonfigurasiAbsensi from "../models/KonfigurasiAbsensiModel.js";
import SatuanKerjaModel from "../models/SatuanKerjaModel.js";
import User from "../models/UserModel.js";

export const getKonfigurasiAbsensi = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findOne({
            where: { id },
        });

        const satuanKerja = await SatuanKerjaModel.findOne({
            where: {
                id: user.satuan_kerja_id
            }
        })

        const konfigurasiAbsensi = await KonfigurasiAbsensi.findOne({
            where: {
                satuan_kerja_id: satuanKerja.id
            },
            include: {
                model: SatuanKerjaModel,
                attributes: ["id", "nama_satuan_kerja"]
            }

        });

        return payload(200, true, "Konfigurasi Absensi", konfigurasiAbsensi, res);
    } catch (e) {
        return payload(500, false, e.toString(), null, res);
    }
}

export const createKonfigurasiAbsensi = async (req, res) => {
    try {
        const { jam_masuk, jam_pulang, radius, satuan_kerja_id } = req.body;
        if (!jam_masuk || !jam_pulang || !radius || !satuan_kerja_id) {
            return payload(400, false, "Data tidak lengkap", null, res);
        }
        const checkKonfigurasiAbsensiOnSatuanKerja = await KonfigurasiAbsensi.findOne({
            where: {
                satuan_kerja_id: satuan_kerja_id
            }
        })
        if (checkKonfigurasiAbsensiOnSatuanKerja) {
            return payload(400, false, "Konfigurasi Absensi sudah ada", null, res);
        }
        console.log(jam_masuk)
        const konfigurasiAbsensi = await KonfigurasiAbsensi.create({
            jam_masuk: jam_masuk,
            jam_pulang: jam_pulang,
            radius: radius,
            satuan_kerja_id: satuan_kerja_id
        })

        return payload(200, true, "Konfigurasi Absensi berhasil ditambahkan", konfigurasiAbsensi, res);
    } catch (e) {
        return payload(500, false, e.toString(), null, res);
    }
}

export const updateKonfigurasiAbsensi = async (req, res) => {
    try {
        const { jam_masuk, jam_pulang, radius, satuan_kerja_id } = req.body;
        const { id } = req.params;

        const konfigurasiAbsensi = await KonfigurasiAbsensi.findOne({
            where: {
                id: id
            }
        })

        if (!konfigurasiAbsensi) {
            return payload(400, false, "Konfigurasi Absensi tidak ditemukan", null, res);
        }

        if (!jam_masuk || !jam_pulang || !radius || !satuan_kerja_id) {
            return payload(400, false, "Data tidak lengkap", null, res);
        }

        const updateKonfigurasiAbsensi = await KonfigurasiAbsensi.update({
            jam_masuk: jam_masuk,
            jam_pulang: jam_pulang,
            radius: radius,
            satuan_kerja_id: satuan_kerja_id
        }, {
            where: {
                id: id
            }
        })

        return payload(200, true, "Konfigurasi Absensi berhasil ditambahkan", null, res);
    } catch (e) {
        return payload(500, false, e.toString(), null, res);
    }
}