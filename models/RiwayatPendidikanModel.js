import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import User from "./UserModel.js"

const { DataTypes } = Sequelize
const RiwayatPendidikan = db.define(
    "riwayat_pendidikan",
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
        jenjang: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nama_pendidikan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tahun_masuk: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tahun_lulus: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gelar: {
            type: DataTypes.STRING,
        }
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)

User.hasMany(RiwayatPendidikan, { foreignKey: "user_id" })
RiwayatPendidikan.belongsTo(User, { foreignKey: "user_id" })

export default RiwayatPendidikan