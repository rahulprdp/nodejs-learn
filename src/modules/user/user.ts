import prisma from "../../db";
import { createJwt } from "../../utils/auth";
import { comparePasswords, hashPassword } from "../../utils/crypto";

export const createUser = async (req, res) => {
    if (req.body.username && req.body.password) {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })

        const jwt = createJwt(user)

        res.status(200)
        res.json({ token: jwt })
    }
    else {
        res.status(401)
        res.send("User Unauthorized")
    }
}


export const signIn = async (req, res) => {
    if(req?.body?.username){
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        })

        if(!user?.password){
            res.status(401)
            res.send("User not found") 
            return
        }

        comparePasswords(req.body.password, user.password).then((val) => {
            res.status(200)
            res.json({
                token : createJwt(user)
            })
            return
        }).catch((err) => {
            res.status(401)
            res.send("User Unauthorized - CP")
            return
        })

    }else{
        res.status(401)
        res.send("User Unauthorized - ID")
        return
    }
}