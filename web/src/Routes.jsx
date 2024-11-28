import { PrivateSet, Router, Route, Set } from '@redwoodjs/router'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import BlogLayout from 'src/layouts/BlogLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
    <Set wrap={ScaffoldLayout} title="Books" titleTo="books" buttonLabel="New Book" buttonTo="newBook">
    <Route path="/books/new" page={BookNewBookPage} name="newBook" />
    <Route path="/books/{id:Int}/edit" page={BookEditBookPage} name="editBook" />
    <Route path="/books/{id:Int}" page={BookBookPage} name="book" />
    <Route path="/books" page={BookBooksPage} name="books" />
    </Set>
    <PrivateSet unauthenticated="forbidden" roles="admin">
     <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
      <Route path="/users/new" page={UserNewUserPage} name="newUser" />
      <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
      <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
      <Route path="/users" page={UserUsersPage} name="users" />
     </Set>
    </PrivateSet>
     <PrivateSet unauthenticated="home">
      <Set wrap={ScaffoldLayout} title="Audits" titleTo="audits" buttonLabel="New Audit" buttonTo="newAudit">
        <Route path="/audits/new" page={AuditNewAuditPage} name="newAudit" />
        <Route path="/audits/{id}/edit" page={AuditEditAuditPage} name="editAudit" />
        <Route path="/audits/{id}" page={AuditAuditPage} name="audit" />
        <Route path="/audits" page={AuditAuditsPage} name="audits" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Posts" titleTo="posts" buttonLabel="New Post" buttonTo="newPost">
        <Route path="/admin/posts/new" page={PostNewPostPage} name="newPost" />
        <Route path="/admin/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
        <Route path="/admin/posts/{id:Int}" page={PostPostPage} name="post" />
        <Route path="/admin/posts" page={PostPostsPage} name="posts" />
      </Set>
     </PrivateSet>
      <Route path="/login-passwordless" page={LoginPasswordlessPage} name="loginPasswordless" />
      <Route path="/login" page={LoginPasswordlessPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Set wrap={BlogLayout}>
        <Route path="/article/{id:Int}" page={ArticlePage} name="article" />
        <Route path="/contact" page={ContactPage} name="contact" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
      <Route path="/forbidden" page={NotFoundPage} name="forbidden" />
    </Router>
  )
}

export default Routes
