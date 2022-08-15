import { NotFound } from "components/index";
import LoginPage from "features/auth/login/index";
import { BranchFeature } from "features/branch";
import BranchDetail from "features/branch/detail";
import MyBranch from "features/branch/my-branch";
import DashboardFeature from "features/dashboard/index";
import ProductFeature from "features/product";
import ProductDetail from "features/product/detail";
import Export from "features/product/export";
import Import from "features/product/import";
import InventoryProduct from "features/product/inventory";
import ProfileFeature from "features/profile";
import ListAccount from "features/profile/list-account";
import MyStaff from "features/profile/my-staff";
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

        {/* Private Layout */}
        <Route path='/profile' element={<PrivateLayout />}>
          <Route index element={<ProfileFeature />} />
        </Route>

        <Route path='/dashboard' element={<PrivateLayout />}>
          <Route index element={<DashboardFeature />} />
        </Route>

        <Route path='/branch' element={<PrivateLayout />}>
          <Route index element={<BranchFeature />} />
          <Route path='detail/:id' element={<BranchDetail />} />
        </Route>

        <Route path='/my-branch' element={<PrivateLayout />}>
          <Route index element={<MyBranch />} />
        </Route>

        <Route path='/product' element={<PrivateLayout />}>
          <Route index element={<ProductFeature />} />
        </Route>

        <Route path='/inventory' element={<PrivateLayout />}>
          <Route index element={<InventoryProduct />} />
        </Route>

        <Route path='/import' element={<PrivateLayout />}>
          <Route index element={<Import />} />
        </Route>

        <Route path='/export' element={<PrivateLayout />}>
          <Route index element={<Export />} />
        </Route>

        <Route path='/manage-account' element={<PrivateLayout />}>
          <Route index element={<ListAccount />} />
        </Route>
        <Route path='/my-staff' element={<PrivateLayout />}>
          <Route index element={<MyStaff />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
