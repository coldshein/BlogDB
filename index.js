import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt' 
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import multer from 'multer';
import cors from 'cors';


import { registerValidation, loginValidation, postCreateValidation } from './validation.js';

import {PostController, UserController} from './controllers/index.js'
import {checkAuth, handleValidationErrors} from './utils/index.js'


mongoose.connect('mongodb+srv://admin:admin123@coldcluster.7vq6x0r.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('DB is OK');
}).catch((err) => console.log('DB ERROR', err))

const app = express();

const storage = multer.diskStorage({
    destination: (i, s, cb) => {
        cb(null, 'uploads');
    },
    filename: (i, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.post('/auth/login',loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors,  UserController.register); 
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
} )

app.get('/tags', PostController.getTags)
app.get('/posts', PostController.getAll )
app.get('/posts/tags', PostController.getTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id',checkAuth, postCreateValidation, handleValidationErrors, PostController.update)



app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server has been started working...')
});