import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
 
import {registerValidation} from './validations/auth.js';

mongoose.connect('mongodb+srv://admin:admin123@coldcluster.7vq6x0r.mongodb.net/').then(() => {
    console.log('DB is OK');
}).catch((err) => console.log('DB ERROR', err))

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, (req ,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    res.json({
        succes:true,
    })
});

app.listen(4444, (err) => {
    if(err){
        return console.log(err)
    }
    console.log('Server has been started working...');
})
