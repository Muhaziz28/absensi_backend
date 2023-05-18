import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import User from "./UserModel.js"
import Suku from "./SukuModel.js"
import Agama from "./AgamaModel.js"

const { DataTypes } = Sequelize
const UserDetail = db.define(
    "user_detail",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        tempat_lahir: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tanggal_lahir: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        no_hp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jenis_kelamin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status_perkawinan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        agama_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        suku_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
)

User.hasOne(UserDetail, { foreignKey: "user_id" })
UserDetail.belongsTo(User, { foreignKey: "user_id" })

Suku.hasMany(UserDetail, { foreignKey: "suku_id" })
UserDetail.belongsTo(Suku, { foreignKey: "suku_id" })

Agama.hasMany(UserDetail, { foreignKey: "agama_id" })
UserDetail.belongsTo(Agama, { foreignKey: "agama_id" })

export default UserDetail