import "./App.css";
import Table from "./components/Wages/Wages";
import Form from "./components/Form/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/epf" element={<Table />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
