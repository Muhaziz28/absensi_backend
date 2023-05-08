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
};