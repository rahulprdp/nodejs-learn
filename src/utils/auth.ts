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
    }

    const [label , token] = bearer.split(' ')
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        
        console.log(payload);
        next();
        return;
      } catch (e) {
        console.error(e);
        res.status(401);
        res.send("Not authorized");
        return;
      }
}