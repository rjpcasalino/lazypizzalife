import { Link, routes } from '@redwoodjs/router'
import App from 'src/App'

import { useAuth } from 'src/auth'

const BlogLayout = ({ children }) => {
  const { isAuthenticated, currentUser, userMetadata, logOut } = useAuth()

  return (
    <>
      <header>
        <div className="flex-between">
          <h1>
            <Link to={routes.home()}>Lazy Pizza Life</Link>
          </h1>
          {isAuthenticated ? (
            <div>
                <span>jello, {userMetadata.name}!</span>{' '}<br/>
              <span>Logged in under {JSON.parse(localStorage.getItem('@@auth0spajs@@::'+currentUser.azp+'::@@user@@')).decodedToken.user.email }</span>{' '}
              <button type="button" onClick={logOut}>
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
