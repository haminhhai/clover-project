import LoginPage from "features/auth/login/index";
import { lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>abc</div>}>

        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
