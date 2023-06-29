import { Op } from "sequelize"
import User from "../models/UserModel.js"
import payload from "../response_format.js"
import Role from "../models/RoleModel.js"
import UserDetail from "../models/UserDetailModel.js"
import Agama from "../models/AgamaModel.js"
import Suku from "../models/SukuModel.js"
import SatuanKerja from "../models/SatuanKerjaModel.js"
import Pangkat from "../models/PangkatModel.js"
import Jabatan from "../models/JabatanModel.js"
import bcrypt from "bcrypt"

export const getAllPersonil = async (req, res) => {
    try {
        const personil = await User.findAll({
            where: [
                { is_active: true },
                { role_id: { [Op.ne]: 6 }, },
            ],
            attributes: { exclude: ["password", "role_id", "jabatan_id", "pangkat_id"] },
            include: [
                {
                    model: Role,
                    attributes: ["id", "role_name"]
                },
                {
                    model: SatuanKerja,
                    attributes: ["id", "nama_satuan_kerja"]
                },
                {
                    model: UserDetail,
                    attributes: { exclude: ["user_id", "agama_id", "suku_id", "createdAt", "updatedAt"], },
                    include: [
                        {
                            model: Agama,
                            attributes: ["id", "agama"]
                        },
                        {
                            model: Suku,
                            attributes: ["id", "nama_suku"]
                        },
                    ],
                },
                {
                    model: Pangkat,
                    attributes: ["id", "nama_pangkat"]
                },
                {
                    model: Jabatan,
                    attributes: ["id", "kelas_jabatan", "nama_jabatan"]
                }
            ]
        })

        return payload(200, true, "Data personil", personil, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createPersonil = async (req, res) => {
    try {
        const { name, role_id, jabatan_id, pangkat_id, username, email, password, satuan_kerja_id, tempat_lahir, tanggal_lahir, no_hp, jenis_kelamin, foto, status_perkawinan, agama_id, suku_id } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log('Pangkat : ', pangkat_id);
        console.log('Jabatan : ', jabatan_id);
        const user = await User.create({
            name,
            username,
            email,
            jabatan_id,
            pangkat_id,
            password: hashedPassword,
            satuan_kerja_id,
            role_id,
            is_active: true,
        })

        const user_detail = await UserDetail.create({
            user_id: user.id,
            tempat_lahir,
            tanggal_lahir,
            no_hp,
            jenis_kelamin,
            foto,
            status_perkawinan,
            agama_id,
            suku_id,
        })

        // console.log(user_detail);

        return payload(200, true, "Personil created", user, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}