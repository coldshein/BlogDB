import {body} from 'express-validator'

export const registerValidation = [
    body('email', "Email is incorrect!").isEmail(),
    body('password', "Password can't be less then 6 symbols").isLength({min:6}),
    body('fullName', "Enter your name").isLength({min:3}),
    body('avatarUrl', "Incorrect avatar link").optional().isURL(),
]

export const loginValidation = [
    body('email', "Email is incorrect!").isEmail(),
    body('password', "Password can't be less then 6 symbols").isLength({min:6}),
]

export const postCreateValidation = [
    body('title', "Enter title of your post").isLength({min : 3}).isString(),
    body('text', "Enter text of your post").isLength({min:3}).isString(),
    body('tags', "Incorrect tags format").optional().isString(),
    body('imageUrl', "Incorrect image link").optional().isString(),
]

