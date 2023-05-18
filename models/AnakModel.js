import { Sequelize } from "sequelize"
import User from "./UserModel.js"
import db from "../config/Database.js"
import Agama from "./AgamaModel.js"

const { DataTypes } = Sequelize
const Anak = db.define(
    "data_anak",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        nama_anak: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tempat_lahir_anak: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tanggal_lahir_anak: {
            type: DataTypes.DATE,
            allowNull: false
        },
        jenis_kelamin_anak: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anak_ke: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pendidikan_terakhir_anak: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pekerjaan_anak: {
            type: DataTypes.STRING,
            allowNull: true
        },
        agama_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)

User.hasMany(Anak, { foreignKey: "user_id", sourceKey: "id" })
Anak.belongsTo(User, { foreignKey: "user_id", targetKey: "id" })

Agama.hasMany(Anak, { foreignKey: "agama_id", sourceKey: "id" })
Anak.belongsTo(Agama, { foreignKey: "agama_id", targetKey: "id" })

export default Anak