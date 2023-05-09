import {Sequelize} from "sequelize"
import db from "../config/database.js"

const {DataTypes} = Sequelize
const SukuModel = db.define(
    "suku",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_suku: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)

export default SukuModel