import payload from "../response_format.js";
import KonfigurasiAbsensi from "../models/KonfigurasiAbsensiModel.js";
import SatuanKerjaModel from "../models/SatuanKerjaModel.js";

export const getKonfigurasiAbsensi = async (req, res) => {
    try {
        const konfigurasiAbsensi = await KonfigurasiAbsensi.findAll({
            include: [
                {
                    model: SatuanKerjaModel,
                    as: "satuan_kerja",
                }
            ]

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