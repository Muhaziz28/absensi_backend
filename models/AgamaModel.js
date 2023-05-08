import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize
const Agama = db.define(
    "agama",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        agama: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)

export default Agama