import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="grid place-content-center h-dvh">
      <div className="flex flex-col gap-5">
        <div className='flex items-center gap-4'>
          <Link to="/signin">
            <Button variant="primary">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Sign up</Button>
          </Link>
          <Link to="/forgot-password">
            <Button variant="primary">Forgot Password</Button>
          </Link>
          <Link to="/password-reset">
            <Button variant="primary">Reset password</Button>
          </Link>
          <Link to="/verify-email">
            <Button variant="primary">Email verification</Button>
          </Link>
        </div>
        <div className='w-fit mx-auto flex flex-col gap-3'>
          <Link to="/app/home">
            <Button variant="primary">Press me!</Button>
          </Link>
          <Button isLoading variant="primary">
            Loading primary
          </Button>
          <Button variant="outline">outline button</Button>
          <Button variant="secondary">secondary button</Button>
          <Button variant="accent">accent button</Button>
          <Button disabled>disabled button</Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage