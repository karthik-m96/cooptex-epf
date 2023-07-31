import Wages from "./components/Wages/Wages";
import Form from "./components/Form/Form";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Form /> },
    { path: "/epf/:uan", element: <Wages /> },
  ]);
  return (
    <RouterProvider router={router}>
      <div className="App">
        <Route path="/" element={<Form />} />
        <Route path="/epf/:uan" element={<Wages />} />
      </div>
    </RouterProvider>
  );
};

export default App;
