import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>Header</header>
      <Suspense fallback="loading...">
        <Outlet />
      </Suspense>
    </>
  );
}

export default Layout;
