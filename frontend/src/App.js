import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Assuming Home is in the pages folder
import Navbar from "./components/Navbar"; // Assuming Navbar is set up

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add other routes if needed */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;