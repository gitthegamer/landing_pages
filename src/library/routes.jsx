import NotFoundPage from "../pages/404.jsx";
import Home from "../pages/Home.jsx";
import Layout from "./../components/Layout.jsx";

const routes = [
  {
    path: "/",
    element: <Layout />, // Common Layout
    children: [{ path: "/", name: "The Play Standard", element: <Home /> }],
  },
  {
    path: "*",
    element: <Layout />,
    children: [{ path: "*", name: "NotFound", element: <NotFoundPage /> }],
  },
];

export default routes;
