import { Op } from "sequelize"
import AbsenMasuk from "../models/AbsenMasukModel.js"
import AbsenPulang from "../models/AbsenPulangModel.js"
import payload from "../response_format.js"
import User from "../models/UserModel.js"
import KonfigurasiAbsensi from "../models/KonfigurasiAbsensiModel.js"
import Jabatan from "../models/JabatanModel.js"

export const getMyTunjangan = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findOne({
            where: { id },
            attributes: ["id", "name", "email", "role_id", "jabatan_id", "pangkat_id", "satuan_kerja_id"],
            include: {
                model: Jabatan,
                attributes: ["id", "kelas_jabatan", "nama_jabatan", "tunjangan_kinerja"],
            },
        });

        if (user.jabatan_id === null) return payload(400, false, "Jabatan belum diatur oleh admin", null, res);

        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const absenMasuk = await AbsenMasuk.findAll({
            where: [
                { user_id: id },
                { created_at: { [Op.gte]: `${year}-${month}-01` } },
            ],
            attributes: {
                exclude: ["user_id"],
            },
            order: [["created_at", "DESC"]],
        });

        const absenPulang = await AbsenPulang.findAll({
            where: [
                { user_id: id },
                { created_at: { [Op.gte]: `${year}-${month}-01` } },
            ],
            attributes: {
                exclude: ["user_id"],
            },
            order: [["created_at", "DESC"]],
        });

        // hitung keterlambatan absen masuk pada bulan ini
        // total keterlambatan dihitung perhari,
        // setiap terlambat 1 - 2 jam akan dikenakan potongan 0.75%
        const konfigurasiAbsensi = await KonfigurasiAbsensi.findOne();

        // tampilkan keterlambatan dan jumlah potongan perhari pada bulan ini
        const keterlambatan = absenMasuk.map((item) => {
            const jamKeterlambatan = new Date(item.keterlambatan).getHours();
            const menitKeterlambatan = new Date(item.keterlambatan).getMinutes();

            // hanya user yang terlambat yang akan dikenakan potongan
            const potongan = jamKeterlambatan > 2 ? 0.75 + (jamKeterlambatan - 2) * 0.75 : 0;

            return {
                tanggal: new Date(item.created_at).toLocaleDateString(),
                potongan,
            };
        });

        // hitung jumlah potongan keterlambatan
        const totalPotonganKeterlambatan = keterlambatan.reduce((acc, item) => {
            return acc + item.potongan;
        }, 0);

        const totalTunjanganAwal = user.jabatan.tunjangan_kinerja;
        const totalPotonganKeterlambatanPersen = totalPotonganKeterlambatan / 100;
        const totalTunjanganAkhir = totalTunjanganAwal - totalTunjanganAwal * totalPotonganKeterlambatanPersen;

        return payload(200, true, "Data tunjangan berhasil didapatkan", {
            user,
            absenMasuk,
            absenPulang,
            keterlambatan,
            totalPotonganKeterlambatan,
            totalTunjanganAwal,
            totalTunjanganAkhir,
        }, res);
    } catch (error) {
        return payload(500, false, error.message, null, res);
    }
};
