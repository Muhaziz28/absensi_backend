import AbsenMasuk from "../models/AbsenMasukModel.js"
import AbsenPulang from "../models/AbsenPulangModel.js"
import payload from "../response_format.js"

export const getCurrentHistoryAbsen = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const historyAbsenMasuk = await AbsenMasuk.findOne({
            where: { user_id: id },
            attributes: {
                exclude: ["user_id", "createdAt", "updatedAt"],
            },
            order: [
                ["created_at", "DESC"]
            ]
        })

        const historyAbsenKeluar = await AbsenPulang.findOne({
            where: { user_id: id },
            attributes: {
                exclude: ["user_id", "createdAt", "updatedAt"],
            },
            order: [
                ["created_at", "DESC"]
            ]
        })

        const historyAbsen = {
            absen_masuk: historyAbsenMasuk,
            absen_keluar: historyAbsenKeluar
        }

    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}