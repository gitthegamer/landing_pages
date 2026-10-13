import NotFoundPage from "../pages/404.jsx";
import Home from "../pages/Home.jsx";
import RankingsPage from "../pages/RankingsPage.jsx";
import LiveDataPage from "../pages/LiveDataPage.jsx";
import Layout from "./../components/Layout.jsx";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", name: "The Play Standard", element: <Home /> },
      { path: "/rankings", name: "Rankings", element: <RankingsPage /> },
      { path: "/live", name: "Live Data", element: <LiveDataPage /> },
    ],
  },
  {
    path: "*",
    element: <Layout />,
    children: [{ path: "*", name: "NotFound", element: <NotFoundPage /> }],
  },
];

export default routes;
