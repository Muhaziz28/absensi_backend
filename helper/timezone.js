import moment from "moment-timezone";

// set timezone Asia/Jakarta
moment.tz.setDefault("Asia/Jakarta");

const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

export default currentTime;