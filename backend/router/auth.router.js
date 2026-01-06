const authModel = require('../schema/auth.model')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const VerifyUserFun = require('../middleware/VerifyAuth')
require('dotenv').config()


const SECREt_KEY = process.env.SECRETKEY

router.post('/register', async (req, res) => {
    console.log(req.body)
    const { name, email, type, password } = req.body;

    try {
        const auth = await authModel.findOne({ email: email })
        if (auth) {
            return res.send({
                success: false,
                message: "email already exists"
            })
        }

        let salt = await bcrypt.genSalt(10)
        console.log(salt)

        let hashPassword = await bcrypt.hash(password, salt)

        console.log(hashPassword)

        const user = await authModel.create({ name, email, type, password: hashPassword })
        res.send({
            success: true,
            message: "account has been created!",
            user: user
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Internal server error!",
            error: error
        })
    }

})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await authModel.findOne({ email })

        if (!user) {
            return res.send({
                success: false,
                message: "Invalid email or password!"
            })
        }

        const isAuth = await bcrypt.compare(password, user.password)

        if (!isAuth) {
            return res.send({
                success: false,
                message: "Invalid email or password!"
            })
        }
        console.log(SECREt_KEY)
        console.log(user._id)
        const token = jwt.sign({ id: user._id }, SECREt_KEY)
        console.log(token)
        res.send({
            success: true,
            message: "You are logged in!",
            token: token,
            user: user
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Internal server error!",
            error: error
        })
    }

})

router.get('/profile', VerifyUserFun, async (req, res) => {
    try {
        const user = await authModel.findById(req.user).select("-password")
        res.send({
            success: true,
            message: "User profile fetched successfully",
            user: user
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
})

router.put('/update', (req, res) => { })

router.delete('/delete', (req, res) => { })

module.exports = router;