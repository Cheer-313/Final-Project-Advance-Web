const mongose = require("mongose");

const userSchema = mongose.Schema({
    userId: string,
    username: string,
    password: string,
    fullname: string,
    email: string,
    class: string,
    faculty: string,
    avatar: string,
    categories: [string],
    permission: int,
});

const User = mongose.model("user", userSchema);

module.exports = User;
