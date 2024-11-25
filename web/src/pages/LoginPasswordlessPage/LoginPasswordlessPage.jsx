import { useEffect, useState } from 'react'

import { useLocation } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import LoginPasswordlessForm from 'src/components/LoginPasswordlessForm/LoginPasswordlessForm'
import LoginPasswordlessTokenForm from 'src/components/LoginPasswordlessTokenForm/LoginPasswordlessTokenForm'

const LoginPasswordlessPage = () => {
  let [waitingForCode, setWaitingForCode] = useState(false)
  let [email, setEmail] = useState()
  let [code, setCode] = useState()
  // onload set email from query string
  let { search } = useLocation()
  useEffect(() => {
    let params = new URLSearchParams(search)
    // decode magic param
    let magic = params.get('magic')
    let decoded = window.atob(params.get('magic'))
    // if magic param exists, set email and waitingForCode
    if (magic) {
          // decoded is email:code
      let [email, code] = decoded.split(':')
      setEmail(email)
      setCode(code)
      setWaitingForCode(true)
    }
  }, [search])

  return (
    <>
      <Metadata
        title="LoginPasswordless"
        description="LoginPasswordless page"
      />

      {!waitingForCode && (
        <LoginPasswordlessForm
          setWaitingForCode={setWaitingForCode}
          setEmail={setEmail}
        />
      )}
      {waitingForCode && (
        <LoginPasswordlessTokenForm
          email={email}
          setWaitingForCode={setWaitingForCode}
          code={code}
        />
      )}
    </>
  )
}

export default LoginPasswordlessPage
