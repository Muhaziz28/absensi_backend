import Role from "../models/RoleModel.js"
import payload from "../response_format.js"

export const getAllRole = async (req, res) => {
    try {
        const roles = await Role.findAll({
            attributes: {
                exclude: ["created_at", "updated_at"]
            }
        })
        return payload(200, true, "All roles", roles, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const createRole = async (req, res) => {
    try {
        const { role_name } = req.body
        if (role_name.length > 1) {
            const checkRole = await Role.findOne({ where: { role_name } })
            if (checkRole) return payload(400, false, "Role already exist", null, res)
        }
        const role = await Role.create({ role_name })
        return payload(200, true, "Role created", role, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const updateRole = async (req, res) => {
    try {
        const { id } = req.params
        const { role_name } = req.body
        const role = await Role.update({ role_name }, { where: { id } })
        if (!role) return payload(400, false, "Role not found", null, res)
        return payload(200, true, "Role updated", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params
        const role = await Role.destroy({ where: { id } })
        if (role === 0) return payload(400, false, "Role not found", null, res)
        return payload(200, true, "Role deleted", null, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}