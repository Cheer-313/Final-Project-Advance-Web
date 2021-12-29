const divisionRole = require("../../const/role");

const AdminRole = (req, res, next) => {
    if (req.user.role == "Admin") {
        return next();
    }
    return next('route');
};

const DivisionRole = (req, res, next) => {
    //Check role's user is existed in role's system
    let result = divisionRole.some((r) => req.user.role.includes(r));

    if(result){
        return next();
    }
    return next("route");
};

const AdminOrDivisionRole = (req, res, next) =>{
    // Admin role
    let adminResult = req.user.role == "Admin";

    // Devision role
    let divisionResult = divisionRole.some((r) => req.user.role.includes(r));

    if(adminResult || divisionResult){
        return next();
    }
    return next("role");
}


const StudentRole = (req, res, next) => {
    if (req.user.role == "Student") {
        return next();
    }
    return res.redirect("/profile");
};

module.exports = {
    StudentRole,
    AdminRole,
    DivisionRole,
    AdminOrDivisionRole,
};