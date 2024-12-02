import { Metadata } from '@redwoodjs/web'
import { useAuth } from 'src/auth'


const HomePage = () => {
  const { isAuthenticated, signUp } = useAuth()
  return (
    <>
      <Metadata title="Home" description="Home page" />
      <p>{JSON.stringify({ isAuthenticated })}</p>
      <button onClick={signUp}>sign up</button>
    </>
  )
}

export default HomePage
