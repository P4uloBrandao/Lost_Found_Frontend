import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Policy from "./pages/Policy";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/about' element={<About />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/policy' element={<Policy />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
