import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "components/header/Header";

function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback="loading...">
        <Outlet />
      </Suspense>
    </>
  );
}

export default Layout;
