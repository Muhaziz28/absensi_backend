import { Op } from "sequelize"
import AbsenMasuk from "../models/AbsenMasukModel.js"
import AbsenPulang from "../models/AbsenPulangModel.js"
import KonfigurasiAbsensi from "../models/KonfigurasiAbsensiModel.js"
import payload from "../response_format.js"
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import getDistanceFromLatLonInKm from "../helper/distance.js"
import SatuanKerja from "../models/SatuanKerjaModel.js"
import timezone from "../helper/timezone.js"
import currentTime from "../helper/timezone.js"

export const getCurrentHistoryAbsenPerUser = async (req, res) => {
    try {
        const { id } = req.params

        const historyAbsenMasuk = await AbsenMasuk.findAll({
            where: { user_id: id },
            attributes: {
                exclude: ["user_id"],
            },
            order: [["created_at", "DESC"]],
        })

        const historyAbsenKeluar = await AbsenPulang.findAll({
            where: { user_id: id },
            attributes: {
                exclude: ["user_id"]
            },
            order: [["created_at", "DESC"]]
        })

        const historyAbsen = historyAbsenMasuk.map((item, index) => {
            return {
                tanggal: new Date(item.created_at).toLocaleDateString(),
                absen_masuk: item,
                absen_keluar: historyAbsenKeluar[index]
            }
        })

        return payload(200, true, "Data history absen", historyAbsen, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const getCurrentHistoryAbsen = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const historyAbsenMasuk = await AbsenMasuk.findAll({
            where: { user_id: id },
            attributes: {
                exclude: ["user_id"],
            },
            order: [["created_at", "DESC"]],
        })

        const historyAbsenKeluar = await AbsenPulang.findAll({
            where: { user_id: id },
            attributes: {
                exclude: ["user_id"]
            },
            order: [["created_at", "DESC"]]
        })

        const historyAbsen = historyAbsenMasuk.map((item, index) => {
            return {
                tanggal: new Date(item.created_at).toLocaleDateString(),
                absen_masuk: item,
                absen_keluar: historyAbsenKeluar[index]
            }
        })

        return payload(200, true, "Data history absen", historyAbsen, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const getCurrentHistoryAbsenToday = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const currentTimeFormat = currentTime.split(" ")[0]
        console.log('Current time ', currentTime)
        const historyAbsenMasuk = await AbsenMasuk.findOne({
            where: [
                { user_id: id },
                { created_at: { [Op.gte]: currentTimeFormat } },
            ],
            attributes: {
                exclude: ["user_id"],
            },
            order: [["created_at", "DESC"]],
        })

        const historyAbsenKeluar = await AbsenPulang.findOne({
            where: [
                { user_id: id },
                { created_at: { [Op.gte]: currentTimeFormat } },
                console.log('Current Time Format: ', currentTimeFormat)
            ],
            attributes: {
                exclude: ["user_id"]
            },
        })

        const historyAbsen = {
            tanggal: currentTimeFormat,
            absen_masuk: historyAbsenMasuk,
            absen_keluar: historyAbsenKeluar
        }

        return payload(200, true, "Data history absen hari ini", historyAbsen, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const absenMasuk = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const { jam_masuk, longitude, latitude, status } = req.body
        let keterlambatan

        const currentTimeFormat = currentTime.split(" ")[0]
        // user hanya bisa absen masuk 1 kali dalam sehari
        const historyAbsenMasuk = await AbsenMasuk.findOne({
            where: [
                { user_id: id },
                { created_at: { [Op.gte]: currentTimeFormat } },
            ],
            attributes: {
                exclude: ["user_id", "createdAt", "updatedAt"],
            },
            order: [
                ["created_at", "DESC"]
            ]
        })

        if (historyAbsenMasuk) return payload(400, false, "Anda sudah absen masuk", null, res)

        const satuanKerjaUser = await User.findOne({
            where: [
                { id }
            ],
            attributes: {
                exclude: ["id", "password", "createdAt", "updatedAt"],
            },
        })

        const konfigurasiAbsensi = await KonfigurasiAbsensi.findOne({
            where: { id: satuanKerjaUser.satuan_kerja_id }
        })

        const satuanKerja = await SatuanKerja.findOne({
            where: { id: satuanKerjaUser.satuan_kerja_id }
        })

        // jika jarak user terlalu jauh, hitung berapa meter jarak user dengan kantor
        const radius = getDistanceFromLatLonInKm(latitude, longitude, Number(satuanKerja.latitude), Number(satuanKerja.longitude))
        if (radius > konfigurasiAbsensi.radius) return payload(400, false, "Anda terlalu jauh dari kantor, jarak anda dengan kantor adalah " + radius + " meter", null, res)

        console.log("radius", radius);

        const konfigurasiAbsensiJamMasuk = konfigurasiAbsensi.jam_masuk
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

export const absenPulang = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const currentTimeFormat = currentTime.split(" ")[0]

        const absenMasukCheck = await AbsenMasuk.findOne({
            where: [
                { user_id: id },
                { created_at: { [Op.gte]: currentTimeFormat } },
            ],
            attributes: {
                exclude: ["user_id", "created_at", "updated_at"],
            },
            order: [
                ["created_at", "DESC"]
            ]
        })
        if (!absenMasukCheck) return payload(400, false, "Anda belum absen masuk", null, res)

        const { jam_pulang, latitude, longitude, status } = req.body

        const satuanKerjaUser = await User.findOne({
            where: [
                { id }
            ],
            attributes: {
                exclude: ["id", "password", "createdAt", "updatedAt"],
            },
        })

        const konfigurasiAbsensiCheck = await KonfigurasiAbsensi.findOne({
            where: { id: satuanKerjaUser.satuan_kerja_id }
        })

        if (jam_pulang < konfigurasiAbsensiCheck.jam_pulang) {
            return payload(400, false, `Anda tidak dapat absen sebelum jam ${konfigurasiAbsensiCheck.jam_pulang}`, null, res)
        }

        let cepat

        const historyAbsenPulang = await AbsenPulang.findOne({
            where: [
                { user_id: id },
                { created_at: { [Op.gte]: currentTimeFormat } }
            ],
            attributes: {
                exclude: ["user_id", "created_at", "updated_at"],
            },
            order: [
                ["created_at", "DESC"]
            ]
        })

        if (historyAbsenPulang) return payload(400, false, "Anda sudah absen pulang", null, res)

        const satuanKerja = await SatuanKerja.findOne({
            where: { id: satuanKerjaUser.satuan_kerja_id }
        })

        const radius = getDistanceFromLatLonInKm(latitude, longitude, Number(satuanKerja.latitude), Number(satuanKerja.longitude))
        if (radius > konfigurasiAbsensiCheck.radius) return payload(400, false, "Anda terlalu jauh dari kantor, jarak anda dengan kantor adalah " + radius + " meter", null, res)

        console.log(`Radius ${radius} meter`)
        const konfigurasiAbsensiJamPulang = konfigurasiAbsensiCheck.jam_pulang
        const konfigurasiAbsensiJamPulangSplit = konfigurasiAbsensiJamPulang.split(":")
        const konfigurasiAbsensiJamPulangHour = konfigurasiAbsensiJamPulangSplit[0]
        const konfigurasiAbsensiJamPulangMinute = konfigurasiAbsensiJamPulangSplit[1]

        const jamPulangSplit = jam_pulang.split(":")
        const jamPulangHour = jamPulangSplit[0]
        const jamPulangMinute = jamPulangSplit[1]
        const jamPulangHourToMinute = jamPulangHour * 60
        const jamPulangMinuteToInteger = parseInt(jamPulangMinute)
        const jamPulangTotalMinute = jamPulangHourToMinute + jamPulangMinuteToInteger

        const konfigurasiAbsensiJamPulangHourToMinute = konfigurasiAbsensiJamPulangHour * 60
        const konfigurasiAbsensiJamPulangMinuteToInteger = parseInt(konfigurasiAbsensiJamPulangMinute)
        const konfigurasiAbsensiJamPulangTotalMinute = konfigurasiAbsensiJamPulangHourToMinute + konfigurasiAbsensiJamPulangMinuteToInteger

        const cepatTotalMinute = konfigurasiAbsensiJamPulangTotalMinute - jamPulangTotalMinute
        const cepatHour = Math.floor(cepatTotalMinute / 60)
        const cepatMinute = cepatTotalMinute % 60

        if (cepatTotalMinute < 0) {
            cepat = null
        } else {
            cepat = `${cepatHour}:${cepatMinute}`
        }

        await AbsenPulang.create({
            user_id: id,
            jam_pulang,
            radius,
            status,
            cepat
        })

        return payload(200, true, "Absen pulang berhasil", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}
