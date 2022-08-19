const jwt = require('jsonwebtoken');
const JWT_SECRET = "Jigu@jigu"

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object
    const token = req.header('Authorization');
    if(!token) {
        res.status(401).send({error: "Invalid token"})
    }
    console.log(token)
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error: "Invalid token ---"})
    }
}

module.exports = fetchuser;