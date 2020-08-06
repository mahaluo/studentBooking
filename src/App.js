import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, SignIn } from './pages';
import PrivateRoute from './components/auth/privateRoute';
import { AuthProvider } from './components/auth/auth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Route exact path='/' component={SignIn} />
          <PrivateRoute path='/home' component={Home} />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
