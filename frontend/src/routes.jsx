import HomePage from "./components/homePage/Homepage";
import LoginPage from "./components/loginPage/loginPage";
import SignupPage from "./components/signupPage/signupPage";
import ResponsiveChatView from "./components/conversationPage/ResponsiveChat";
import NewTransaction from "./components/transactionPage/NewTransactionForm";
import StartedTransaction from "./components/transactionPage/startedTransaction";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
// dashboard views
import ChatPage  from "./pages/ChatPage";
import UserPage from "./pages/UserPage";
import Login from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import BuyerPage from "./pages/BuyerPage";
import SellerPage from "./pages/SellerPage";
import TransactionsPage from "./pages/Transactions";
import DashboardAppPage from "./pages/DashboardAppPage";

// ----------------------------------------------------------------------

export default function PageRouter() {
  const routes = useRoutes([
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
		{ path: "buyers", element: <BuyerPage /> },
		{ path: "sellers", element: <SellerPage /> },
		{ path: "transactions", element: < TransactionsPage/>}
      ],
    },
    {
      path: "signin",
      element: <Login />,
    },
	{
		path: "chat",
		element: <ChatPage />
	},


    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignupPage />,
    },

    {
      path: "responsive",
      element: <ResponsiveChatView />,
    },
    {
      path: "new-transaction",
      element: <NewTransaction />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
    {
      path: "started-transaction",
      element: <StartedTransaction />,
    },
	{
		path: "404",
		element: <Page404 />
	}
  ]);

  return routes;
}
