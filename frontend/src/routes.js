import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import HomePage from './components/homePage/Homepage';
import LoginPage from './components/loginPage/loginPage';
import SignupPage from './components/signupPage/signupPage';
import ConversationPage from './components/conversationPage/Conversation';

const PageRoute = () => {
  return (
		<>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
	  <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/chat" element={<ConversationPage />} />
    </Routes>
		</>
  );
}

export default PageRoute;
