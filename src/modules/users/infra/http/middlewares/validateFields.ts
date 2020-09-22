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
      .required('O campo email é obrigatório')
      .email('O campo email deve ser um email válido'),
    password: Yup.string().min(8, 'A senha deve conter no mínimo 8 dígitos')
  })

  try {
    await schema.validate(userData)
    next()
  } catch (err) {
    console.log(err)
    throw new AppError(err.errors[0])
  }
}
