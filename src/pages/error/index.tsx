import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
    containerClassName?: string;
    redirectTo?: string;
  };

function ErrorPage({
    containerClassName,
    redirectTo = "/app/home",
}: Props) {
  return (
    <div>
        <p>Something went wrong</p>
        <Link
        className="inline-flex mt-2 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-primary/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 "
        to={redirectTo}
      >
        Go to Home
      </Link>
    </div>
  )
}

export default ErrorPage