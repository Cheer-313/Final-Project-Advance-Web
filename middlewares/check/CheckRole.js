const divisionRole = require("../../const/role");

// Check is existed previos page
let redirectTo = (req,res) =>{
    if (req.session.redirectTo) {
        let result = req.session.redirectTo;
        delete req.session.redirectTo;
        return result;
    }
    else{
        return "/";
    }
};


const StudentRole = (req, res, next) => {
    if(req.user.role == "Student"){
        return next();
    }
    return res.redirect("/profile");
}

const AdminRole = (req, res, next) => {
    if (req.user.role == "Admin") {
        return next();
    }
    return res.redirect("/profile");
};

const DivisionRole = (req, res, next) => {
    //Check role's user is existed in role's system
    let result = divisionRole.some((r) => req.user.role.includes(r));

    if(result){
        return next();
    }
    return res.redirect("/profile");
}

module.exports = {
    StudentRole,
    AdminRole,
    DivisionRole,
};