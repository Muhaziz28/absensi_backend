import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import Role from "./RoleModel.js"
import Jabatan from "./JabatanModel.js";
import Pangkat from "./PangkatModel.js";
import SatuanKerja from "./SatuanKerjaModel.js";

const { DataTypes } = Sequelize
const User = db.define(
    "user",
    {
        id: {
            unique: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jabatan_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pangkat_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        satuan_kerja_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
)

Role.hasMany(User, { foreignKey: "role_id" })
User.belongsTo(Role, { foreignKey: "role_id" })

Jabatan.hasMany(User, { foreignKey: "jabatan_id" })
User.belongsTo(Jabatan, { foreignKey: "jabatan_id" })

Pangkat.hasMany(User, { foreignKey: "pangkat_id" })
User.belongsTo(Pangkat, { foreignKey: "pangkat_id" })

SatuanKerja.hasMany(User, { foreignKey: "satuan_kerja_id" })
User.belongsTo(SatuanKerja, { foreignKey: "satuan_kerja_id" })

export default User