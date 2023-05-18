import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import User from "./UserModel.js"

const { DataTypes } = Sequelize
const AbsenMasuk = db.define(
    "absen_masuk",
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
        jam_masuk: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        radius: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        keterlambatan: {
            type: DataTypes.TIME,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)

User.hasMany(AbsenMasuk, { foreignKey: "user_id" })
AbsenMasuk.belongsTo(User, { foreignKey: "user_id" })

export default AbsenMasuk