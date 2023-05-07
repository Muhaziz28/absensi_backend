import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import User from "./UserModel.js"

const { DataTypes } = Sequelize

const AccessToken = db.define(
    "access_token",
    {
        id: {
            unique: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        access_token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        ip_address: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
)

User.hasMany(AccessToken, { foreignKey: "user_id" })
AccessToken.belongsTo(User, { foreignKey: "user_id" })

export default AccessToken