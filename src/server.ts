import express from 'express'
import { router } from './modules/product/product.router'
import morgan from 'morgan'; //?Middlewear lib, similar to Sentry
import cors from 'cors'
import { protect } from './utils/auth';
//? The API
const app = express()

//TODO: Setting middlewear for the whole app
app.use(morgan('dev'))
app.use(express.json()) //?Converts res to JSON
app.use(express.urlencoded({extended : true})) //?Converts query string to object


//TODO: Custom Middlewears
app.use((req,res,next)=>{
    req['_XUR'] = "qwertyuiop"
    next()
})

const customLogger = (message : string) => (req,res,next)=>{
    console.log(`Middlewear msg : ${message}`);
    next()
}

app.use(customLogger('Hola!'))

//? Compose-middlewear to chain middlewears together

/*
CORS is also a middlewear
Cross origin resource sharing, config to tell a browser who or what can access the api.
*/

app.unsubscribe(cors()) // This means everyone has access


//TODO Routing entry point

app.get('/',(req : any,res)=>{
    res.json({message : 'Hello world!', _XUR : req?._XUR || "Something went wrong"})
})

app.use('/api', protect, router)

export default app

//!This is how a basic-basic api looks like