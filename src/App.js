import "./App.css";
import Table from "./components/Wages/Wages";
import Form from "./components/Form/Form";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Form /> },
    { path: "/epf", element: <Table /> },
  ]);
  return (
    <RouterProvider router={router}>
      <div className="App">
        <Route path="/" element={<Form />} />
        <Route path="/epf" element={<Table />} />
      </div>
    </RouterProvider>
  );
};

export default App;