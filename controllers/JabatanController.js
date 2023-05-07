import payload from "../response_format.js";
import Jabatan from "../models/JabatanModel.js";

export const getAllJabatan = async(req, res) => {
    try {
        const jabatan = await Jabatan.findAll({
            attributes: {
                exclude: ["created_at", "updated_at"]
            }
        })
        return payload(200, true, "All jabatan", jabatan, res)
    } catch (error) {
        return payload(500, false, error.message, null, res)
    }
}