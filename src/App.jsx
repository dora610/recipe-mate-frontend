import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipeForm from './components/admin/RecipeForm';
import UserForm from './components/admin/UserForm';
import './App.css';
import AuthProvider from './components/AuthProvider';
import RequireAdminAuth from './components/RequireAdminAuth';
import RequireAuth from './components/RequireAuth';
import RecipeDetails from './pages/admin/RecipeDetails';
import UserDetails from './pages/admin/UserDetails';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import ShowRecipe from './pages/ShowRecipe';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RecipDataProvider from './providers/RecipDataProvider';
import SavedRecipes from './pages/SavedRecipes';
const AddRecipe = lazy(() => import('./pages/AddRecipe'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

function App() {
  return (
    <AuthProvider>
      <RecipDataProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgotpassword" element={<ForgotPassword />} />
              <Route
                path="resetpassword/:resetToken"
                element={<ResetPassword />}
              />
              <Route path="recipe/">
                <Route
                  path=":recipeId"
                  element={
                    <RequireAuth>
                      <ShowRecipe />
                    </RequireAuth>
                  }
                />
                <Route
                  path="addRecipe"
                  element={
                    <RequireAuth>
                      <React.Suspense fallback={<>Loading...</>}>
                        <AddRecipe />
                      </React.Suspense>
                    </RequireAuth>
                  }
                />
                <Route
                  path="updateRecipe"
                  element={
                    <RequireAuth>
                      <React.Suspense fallback={<>Loading...</>}>
                        <AddRecipe />
                      </React.Suspense>
                    </RequireAuth>
                  }
                />
                <Route
                  path="saved"
                  element={
                    <RequireAuth>
                      <SavedRecipes />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route
              path="admin"
              element={
                <React.Suspense fallback={<>Loading..</>}>
                  <AdminLayout />
                </React.Suspense>
              }
            >
              <Route
                index
                element={
                  <React.Suspense fallback={<>Loading...</>}>
                    <RequireAdminAuth>
                      <AdminDashboard />
                    </RequireAdminAuth>
                  </React.Suspense>
                }
              />
              <Route path="user" element={<UserDetails />}>
                <Route
                  path=":userId"
                  element={
                    <RequireAdminAuth>
                      <UserForm />
                    </RequireAdminAuth>
                  }
                />
              </Route>
              <Route path="recipe" element={<RecipeDetails />}>
                <Route
                  path=":recipeId"
                  element={
                    <RequireAdminAuth>
                      <RecipeForm />
                    </RequireAdminAuth>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecipDataProvider>
    </AuthProvider>
  );
}

export default App;
