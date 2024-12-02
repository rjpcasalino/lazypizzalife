import { db } from 'src/lib/db'
import crypto from 'node:crypto'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import { sendEmail } from 'src/lib/email' // noted below
import { requireAuth } from 'src/lib/auth'

const DELETE_USER_ROLES = ['admin']

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
  requireAuth({ role: DELETE_USER_ROLES})
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  audits: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).audits()
  },
}

export const generateSignupToken = async ({ email }) => {
  try {
    // do something fun here
    // const fun

    if (!fun) {
      return { message: 'Login Request received' }
    }

    // here we're going to generate a random password of 6 numbers
    const randomNumber = crypto
      .randomInt(0, 1_000_000)
      .toString()
      .padStart(6, '0')
    // email the user this number

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
    console.debug(lookupUser)
    sendTestEmail(lookupUser.email, randomNumber)
    return { message: 'Login Request received' }
  } catch (error) {
    console.log({ error })
    throw new UserInputError(error.message)
  }

}

export const generateToken = async ({ email }) => {
  try {
    // look up if the user exists
    const lookupUser = await db.user.findFirst({ where: { email } })
    console.debug("lookupUser has run.")
    if (!lookupUser) {
      return { message: 'Login Request received' }
    }

    // here we're going to generate a random password of 6 numbers
    const randomNumber = crypto
      .randomInt(0, 1_000_000)
      .toString()
      .padStart(6, '0')
    // email the user this number

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
    console.debug(lookupUser)
    sendTestEmail(lookupUser.email, randomNumber)
    return { message: 'Login Request received' }
  } catch (error) {
    console.log({ error })
    throw new UserInputError(error.message)
  }
}

function sendTestEmail(emailAddress, token) {
  const subject = 'Test Email'
  const text =
    'This is either a manually or automatically triggered email.\n\n' +
    'It was sent from a JavaScript (copyright) web application.\n\n' +
    token
  const html =
    'This is either a manually or automatically triggered email.<br><br>' +
    'It was sent from a JavaScript (copyright) web application.<br><br>' +
    token
    // sendEmail is defined in api/src/lib/email.js
  return sendEmail({ to: emailAddress, subject, text, html })
}

function sendSignupTestEmail(emailAddress) {
  const subject = 'Jello Morld'
  const text = 'You are here because the outside world rejects you.\n\nTHIS is your family.\n\n*I* am your father.\n\n'
  const html =
    'This is either a manually or automatically triggered email.'
  return sendEmail({ to: emailAddress, subject, text, html })
}


export const emailUser = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id },
  })

  await sendTestEmail(user.email)

  return user
}

export const emailTokenToUser = async () => {
  console.debug("!!!!Reminder that this costs $$$!!!!")
  await sendTestEmail(user.email)
}

