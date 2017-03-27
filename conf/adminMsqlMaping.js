/**
 * Created by Administrator on 2017/3/3.
 */
var admin = {
    insert: "INSERT INTO admin VALUES('', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    select: "SELECT * FROM admin WHERE UserName = ?"
};
module.exports = admin;