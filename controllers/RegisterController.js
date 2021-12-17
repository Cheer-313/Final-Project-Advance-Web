class RegisterController {
    index (req, res){
        return res.render('register');
    }

    register(req, res){
        let {username, password} = req.body;
        console.log(username, password);
        return res.end("OK");
    }
}

module.exports = new RegisterController();