import { Sequelize } from "sequelize"
import db from "../config/Database.js"
import Role from "./RoleModel.js"

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
    }
)

Role.hasMany(User, { foreignKey: "role_id" })
User.belongsTo(Role, { foreignKey: "role_id" })

export default User