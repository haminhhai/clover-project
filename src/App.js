import { NotFound } from "components/index";
import LoginPage from "features/auth/login/index";
import RegisterPage from "features/auth/register/index";
import { BrandFeature } from "features/brands";
import DashboardFeature from "features/dashboard/index";
import ProfileFeature from "features/profile";
import { PrivateLayout, PublicLayout } from "layout";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { isUserLoggedIn } from "utils/index";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isUserLoggedIn() ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} />

        {/* Public Layout  */}
        <Route path="/login" element={<PublicLayout />}>
          <Route index element={<LoginPage />} />
        </Route>

        <Route path="/register" element={<PublicLayout />}>
          <Route index element={<RegisterPage />} />
        </Route>

        {/* Private Layout */}
        <Route path='/profile' element={<PrivateLayout />}>
          <Route index element={<ProfileFeature />} />
        </Route>

        <Route path='/dashboard' element={<PrivateLayout />}>
          <Route index element={<DashboardFeature />} />
        </Route>

        <Route path='/brands' element={<PrivateLayout />}>
          <Route index element={<BrandFeature />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
