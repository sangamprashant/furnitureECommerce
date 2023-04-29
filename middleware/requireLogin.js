const jwt = require("jsonwebtoken")
const  Jwt_secret  = process.env.JWT_SECRET
const mongoose = require("mongoose")
const USEREC = mongoose.model("FURNITUREUSEREC")

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must have logged in 1" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, Jwt_secret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must have logged in 2" })
        }
        const { _id } = payload
        USEREC.findById(_id).then(userData => {
            req.user = userData
            next()
        })
    }) 

}