import { db } from 'api/src/lib/db'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export default async () => {
  const users = [
    { name: 'Arthur', email: 'ryan@rjpc.net', password: 'king' },
    { name: 'Vera', email: 'vera@example.com', password: 'queen' },
  ]

  for (const user of users) {
    const [hashedPassword, salt] = hashPassword(user.password)

    await db.user.upsert({
      where: {
        email: user.email,
      },
      create: {
        name: user.name,
        email: user.email,
        loginToken: "123",
        hashedPassword,
        salt,
      },
      update: {
        name: user.name,
        hashedPassword,
        salt,
      },
    })
  }
}