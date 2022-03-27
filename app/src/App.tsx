import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "components/layout/Layout";
import { AuthProvider } from "state/auth/AuthContext";
import OnlyAuthenticated from "components/only-authenticated/OnlyAuthenticated";
import OnlyNotAuthenticated from "components/only-not-authenticated/OnlyNotAuthenticated";

const Home = lazy(() => import("views/home/Home"));
const Dashboard = lazy(() => import("views/dashboard/Dashboard"));
const Profile = lazy(() => import("views/profile/Profile"));
const SignIn = lazy(() => import("views/sign-in/SignIn"));
const SignUp = lazy(() => import("views/sign-up/SignUp"));

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/dashboard"
            element={<OnlyAuthenticated element={<Dashboard />} />}
          />
          <Route
            path="/profile"
            element={<OnlyAuthenticated element={<Profile />} />}
          />
          <Route
            path="/sign-in"
            element={<OnlyNotAuthenticated element={<SignIn />} />}
          />
          <Route
            path="/sign-up"
            element={<OnlyNotAuthenticated element={<SignUp />} />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
