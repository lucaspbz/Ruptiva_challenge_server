import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO'
import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import * as Yup from 'yup'

export default async function validateFields(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userData: ICreateUsersDTO = request.body

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Email field can not be empty')
      .email('Email field must be a valid email'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password field can not be empty')
  })

  try {
    await schema.validate(userData)
    next()
  } catch (err) {
    throw new AppError(err.errors[0])
  }
}
