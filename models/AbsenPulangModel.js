import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import User from "./UserModel.js"

const { DataTypes } = Sequelize
const AbsenPulang = db.define(
    "absen_pulang",
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
        jam_pulang: {
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
        cepat: {
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

User.hasMany(AbsenPulang, { foreignKey: "user_id" })
AbsenPulang.belongsTo(User, { foreignKey: "user_id" })

export default AbsenPulang