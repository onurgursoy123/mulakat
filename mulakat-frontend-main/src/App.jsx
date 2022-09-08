import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bank from "./views/Bank";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bank />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
