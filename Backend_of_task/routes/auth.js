const bcrypt = require('bcryptjs/dist/bcrypt')
const express = require('express')
const router = express.Router()
require('../db/conn')
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send('Hello world!!')
})
  
//Registration Routing
router.post('/register', async (req, res) => {
    const { fname, lname, email, password } = req.body
    if (!fname || !lname || !email || !password) {
        return res.status(422).json({ error: "pls fill the data properly" })
    }
    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(402).json({ error: "Enter EMAIL Already Exist" })
        }

        const user = new User({ fname, lname, email, password })

        const userRegistered = await user.save()

        if (userRegistered) {
            res.status(201).json({ message: "Registration Done!" })

        } else {
            res.status(500).json({ error: "Regisatration Failed" })

        }


    } catch (err) {
        console.error(err.message)
    }

})

//login routing
router.post('/sigin', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(422).json({ error: "Please Fill all the data" })
        }
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            const match = await bcrypt.compare(password, userLogin.password)
            if (match) {
                res.status(201).json({ message: "UserFound!!!!!" })
            } else {
                res.status(402).json({ error: "Invalid Credentials" })
            }
        } else {
            res.status(402).json({error:"Invalid Credentials!!!!"})
        }

    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router