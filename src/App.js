import "./App.css";
import Wages from "./components/Wages/Wages";
import Form from "./components/Form/Form";
import Login from "./components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteAuth from "./components/Authentication/RouteAuth";

const App = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Login />, index: true },
    { path: "/", element: <RouteAuth children={<Form />} /> },
    { path: `/epf/:uan`, element: <RouteAuth children={<Wages />} />  },
    { path: "*", element: <h1>Page Not Found </h1> },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
