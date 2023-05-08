import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize
const SatuanKerja = db.define(
    "satuan_kerja",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        kode_satuan_kerja: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_satuan_kerja: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alamat_web_satuan_kerja: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        alamat_satuan_kerja: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        no_telp_satuan_kerja: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        no_fax_satuan_kerja: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        kode_pos_satuan_kerja: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        kode_prov: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        kode_kab: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        kode_kec: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        kode_desa: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
)

export default SatuanKerja