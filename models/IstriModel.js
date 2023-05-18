import { Sequelize } from "sequelize"
import User from "./UserModel.js"
import db from "../config/Database.js"

const { DataTypes } = Sequelize
const Istri = db.define(
    "data_istri",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nama_istri: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tempat_lahir_istri: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tanggal_lahir_istri: {
            type: DataTypes.DATE,
            allowNull: false
        },
        pendidikan_terakhir_istri: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pekerjaan_istri: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)

User.hasMany(Istri, { foreignKey: "user_id", sourceKey: "id" })
Istri.belongsTo(User, { foreignKey: "user_id", targetKey: "id" })

export default Istri