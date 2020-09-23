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
    title: Yup.string().required('Title field can not be empty'),
    url: Yup.string()
      .required('Url field can not be empty')
      .url('Url field must be a valid url')
  })

  try {
    await schema.validate(userData)
    next()
  } catch (err) {
    throw new AppError(err.errors[0])
  }
}
