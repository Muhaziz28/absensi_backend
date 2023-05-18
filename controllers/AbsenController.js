import AbsenMasuk from "../models/AbsenMasukModel.js"
import AbsenPulang from "../models/AbsenPulangModel.js"
import KonfigurasiAbsensi from "../models/KonfigurasiAbsensiModel.js"
import payload from "../response_format.js"
import jwt from "jsonwebtoken"

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

        return payload(200, true, "Data history absen", historyAbsen, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const absenMasuk = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const { jam_masuk, radius, status } = req.body
        let keterlambatan

        // user hanya bisa absen masuk 1 kali dalam sehari
        const historyAbsenMasuk = await AbsenMasuk.findOne({
            where: { user_id: id },
            attributes: {
                exclude: ["user_id", "createdAt", "updatedAt"],
            },
            order: [
                ["created_at", "DESC"]
            ]
        })

        if (historyAbsenMasuk) return payload(400, false, "Anda sudah absen masuk", null, res)


        const konfigurasiAbsensi = await KonfigurasiAbsensi.findAll()

        const konfigurasiAbsensiRadius = konfigurasiAbsensi[0].radius
        if (radius > konfigurasiAbsensiRadius) {
            return payload(400, false, "Anda terlalu jauh dari kantor", null, res)
        }

        const konfigurasiAbsensiJamMasuk = konfigurasiAbsensi[0].jam_masuk
        const konfigurasiAbsensiJamMasukSplit = konfigurasiAbsensiJamMasuk.split(":")
        const konfigurasiAbsensiJamMasukHour = konfigurasiAbsensiJamMasukSplit[0]
        const konfigurasiAbsensiJamMasukMinute = konfigurasiAbsensiJamMasukSplit[1]

        const jamMasukSplit = jam_masuk.split(":")
        const jamMasukHour = jamMasukSplit[0]
        const jamMasukMinute = jamMasukSplit[1]
        const jamMasukHourToMinute = jamMasukHour * 60
        const jamMasukMinuteToInteger = parseInt(jamMasukMinute)
        const jamMasukTotalMinute = jamMasukHourToMinute + jamMasukMinuteToInteger

        // user tidak boleh absen sebelum jam 06:00
        if (jamMasukTotalMinute < 360) {
            return payload(400, false, "Anda tidak boleh absen sebelum jam 06:00", null, res)
        }

        const konfigurasiAbsensiJamMasukHourToMinute = konfigurasiAbsensiJamMasukHour * 60
        const konfigurasiAbsensiJamMasukMinuteToInteger = parseInt(konfigurasiAbsensiJamMasukMinute)
        const konfigurasiAbsensiJamMasukTotalMinute = konfigurasiAbsensiJamMasukHourToMinute + konfigurasiAbsensiJamMasukMinuteToInteger

        const keterlambatanTotalMinute = jamMasukTotalMinute - konfigurasiAbsensiJamMasukTotalMinute
        const keterlambatanHour = Math.floor(keterlambatanTotalMinute / 60)
        const keterlambatanMinute = keterlambatanTotalMinute % 60

        if (keterlambatanTotalMinute < 0) {
            keterlambatan = null
        } else {
            keterlambatan = `${keterlambatanHour}:${keterlambatanMinute}`
        }

        await AbsenMasuk.create({
            user_id: id,
            jam_masuk,
            radius,
            status,
            keterlambatan
        })

        return payload(200, true, "Absen masuk berhasil", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}