import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, SignIn, StudentProfile, TeacherProfile } from './pages';
import PrivateRoute from './components/auth/privateRoute';
import { AuthProvider } from './components/auth/auth';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={SignIn} />
          <PrivateRoute path='/home' component={Home} />
          <PrivateRoute path='/student' component={StudentProfile} />
          <PrivateRoute path='/teacher' component={TeacherProfile} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
