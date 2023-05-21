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