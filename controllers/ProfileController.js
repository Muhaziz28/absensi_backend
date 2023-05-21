import Agama from "../models/AgamaModel.js"
import Jabatan from "../models/JabatanModel.js"
import Pangkat from "../models/PangkatModel.js"
import Role from "../models/RoleModel.js"
import SatuanKerja from "../models/SatuanKerjaModel.js"
import Suku from "../models/SukuModel.js"
import UserDetail from "../models/UserDetailModel.js"
import User from "../models/UserModel.js"
import payload from "../response_format.js"
import jwt from "jsonwebtoken"

export const myProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const user = await User.findOne({
            where: { id },
            attributes: {
                exclude: ["password", "role_id", "satuan_kerja_id", "createdAt", "updatedAt"],
            },
            include: [
                {
                    model: Role,
                    attributes: ["id", "role_name"]
                },
                {
                    model: Jabatan,
                    attributes: ["id", "kelas_jabatan", "nama_jabatan", "tunjangan_kinerja"]
                },
                {
                    model: Pangkat,
                    attributes: ["id", "nama_pangkat"]
                },
                {
                    model: SatuanKerja,
                    attributes: ["id", "nama_satuan_kerja"]
                },
                {
                    model: UserDetail,
                    attributes: {
                        exclude: ["user_id", "agama_id", "suku_id", "createdAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: Agama,
                            attributes: ["id", "agama"]
                        },
                        {
                            model: Suku,
                            attributes: ["id", "nama_suku"]
                        },
                    ]
                }
            ]
        })

        return payload(200, true, "Success", user, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updateMyProfile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return payload(401, false, "Unauthorized", null, res)

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        if (!id) return payload(401, false, "Unauthorized", null, res)

        const { tempat_lahir, tanggal_lahir, no_hp, jenis_kelamin, foto, status_perkawinan, agama_id, suku_id } = req.body
        await UserDetail.update({
            tempat_lahir,
            tanggal_lahir,
            no_hp,
            jenis_kelamin,
            foto,
            status_perkawinan,
            agama_id,
            suku_id
        }, {
            where: { user_id: id }
        })

        return payload(200, true, "Profile updated", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}