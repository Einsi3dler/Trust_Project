import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import HomePage from './Homepage';
import LoginPage from './components/loginPage/loginPage';
import SignupPage from './components/signupPage/signupPage';

const PageRoute = () => {
  return (
		<>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
	  <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
    </Routes>
		</>
  );
}

export default PageRoute;
