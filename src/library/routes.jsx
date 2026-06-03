import NotFoundPage from "../pages/404.jsx";
import DepositPageNew from "../pages/DepositPageNew.jsx";
import LandingPage from "../pages/LandingPage.jsx";

import Layout from "./../components/Layout.jsx";

const routes = [
  {
    path: "/",
    element: <Layout />, // Common Layout
    children: [{ path: "/", name: "Home", element: <LandingPage /> }],
  },
  {
    path: "*",
    element: <Layout />,
    children: [{ path: "*", name: "NotFound", element: <NotFoundPage /> }],
  },
];

export default routes;
