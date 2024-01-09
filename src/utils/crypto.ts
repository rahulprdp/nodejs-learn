import bcrypt from 'bcrypt'

export const comparePasswords = (password, hash)=>{
    return bcrypt.compare(password,hash)
}

export const hashPassword = (password : string)=>{
    return bcrypt.hash(password, 5)
}