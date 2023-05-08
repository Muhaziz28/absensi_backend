import {Sequelize} from "sequelize"
import db from "../config/Database.js"
import SatuanKerja from "./SatuanKerjaModel.js";

const {DataTypes} = Sequelize
const KonfigurasiAbsensi = db.define(
    "konfigurasi_absensi",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        jam_masuk: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        jam_pulang: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        radius: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        satuan_kerja_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)

SatuanKerja.hasOne(KonfigurasiAbsensi, { foreignKey: "satuan_kerja_id", sourceKey: "id" })

export default KonfigurasiAbsensi