import { Http2ServerRequest, Http2ServerResponse } from 'http2'
import jwt from 'jsonwebtoken'

export const createJwt = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)

    return token
}


export const protect = (req,res, next) => {
    const bearer = req.headers.authorization

    if(!bearer){
        res.status(401)
        res.send({message : 'Not authorized'})

        return
    }else{
        next()
    }
}