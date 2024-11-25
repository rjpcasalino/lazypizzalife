import { db } from 'src/lib/db'
import crypto from 'node:crypto'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  audits: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).audits()
  },
}

// add this to the bottom of the file
export const generateToken = async ({ email }) => {
  try {
    // look up if the user exists
    const lookupUser = await db.user.findFirst({ where: { email } })

    if (!lookupUser) {
      return { message: 'Login Request received' }
    }

    // here we're going to generate a random password of 6 numbers
    const randomNumber = crypto
      .randomInt(0, 1_000_000)
      .toString()
      .padStart(6, '0')
    console.log({ randomNumber }) // email the user this number

    const [loginToken, salt] = hashPassword(randomNumber)
    // now we'll update the user with the new salt and loginToken
    const loginTokenExpiresAt = new Date()
    loginTokenExpiresAt.setMinutes(loginTokenExpiresAt.getMinutes() + 15)
    const data = {
      salt,
      loginToken,
      loginTokenExpiresAt,
    }
    await db.user.update({
      where: { id: lookupUser.id },
      data,
    })

    return { message: 'Login Request received' }
  } catch (error) {
    console.log({ error })
    throw new UserInputError(error.message)
  }
}

