import { Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage/Homepage";
import LoginPage from "./components/loginPage/loginPage";
import SignupPage from "./components/signupPage/signupPage";
import ResponsiveChatView from "./components/conversationPage/ResponsiveChat";
import ChatPage from "./chatPage";
import NewTransaction from "./components/transactionPage/NewTransactionForm";
import StartedTransaction from "./components/transactionPage/startedTransaction";

const PageRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/responsive" element={<ResponsiveChatView />} />
        <Route path="/transaction" element={<NewTransaction />} />
		<Route path="/started-transaction" element={<StartedTransaction />} />
      </Routes>
    </>
  );
};

export default PageRoute;
