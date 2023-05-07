import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize
const Jabatan = db.define(
    "jabatan",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_jabatan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kelas_jabatan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tunjangan_kinerja: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
)

export default Jabatan