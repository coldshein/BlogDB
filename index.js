import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation, loginValidation, postCreateValidation } from './validation.js';


import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js'
import * as postController from './controllers/PostController.js'



mongoose.connect('mongodb+srv://admin:admin123@coldcluster.7vq6x0r.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('DB is OK');
}).catch((err) => console.log('DB ERROR', err))

const app = express();

app.use(express.json());

app.post('/auth/login',loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register); 
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, postController.create)
app.get('/posts', postController.getAll )

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server has been started working...')
})
