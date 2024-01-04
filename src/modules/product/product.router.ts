import {Router} from 'express';

//Initiate Router
export const router = Router();

//Product
router.get('/product',(req,res)=>{
    res.json({message : 'Product'})
})
router.get('/product/:id',()=>{})
router.post('/product',()=>{})
router.put('/product/:id',()=>{})
router.delete('/product/:id',()=>{})


//Update
router.get('/update',()=>{})
router.get('/update/:id',()=>{})
router.post('/update',()=>{})
router.put('/update/:id',()=>{})
router.delete('/update/:id',()=>{})

//Feature
router.get('/feature',()=>{})
router.get('/feature/:id',()=>{})
router.post('/feature',()=>{})
router.put('/feature/:id',()=>{})
router.delete('/feature/:id',()=>{})

