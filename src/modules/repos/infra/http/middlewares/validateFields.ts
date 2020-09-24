import ICreateRepoDTO from '@modules/repos/dtos/ICreateRepoDTO'
import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import * as Yup from 'yup'

export default async function validateFields(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userData: ICreateRepoDTO = request.body

  const schema = Yup.object().shape({
    full_name: Yup.string().required('full_name field can not be empty'),

  })

  try {
    await schema.validate(userData)
    next()
  } catch (err) {
    throw new AppError(err.errors[0])
  }
}
