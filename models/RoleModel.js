import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize
const Role = db.define(
    "role",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        freezetablename: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
)

export default Role