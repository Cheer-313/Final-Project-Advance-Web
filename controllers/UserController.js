// const user = require('../models/UserModel');

// Google Auth
const { json } = require("express");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = "922682730649-gpahj7tc4qcb260gikdvmnvsq8gvidvr.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

class UserController {
    async signInWithGoogle(token){
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();

            // Check email is student.tdtu.edu.vn or tdtu.edu.vn
            if(payload.hd !== "student.tdtu.edu.vn" && payload.hd !== "tdtu.edu.vn"){
                return JSON.stringify({ code: 1, message: "Error Email Sign In" });
            }

            const user = {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                avatar: payload.picture,
            };
            return JSON.stringify(user);
        } catch (error) {
            return JSON.stringify({ code: 0, message: "Error Sign In" });
        }
    }
}

module.exports = new UserController();