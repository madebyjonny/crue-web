import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
      <h1>from layout</h1>
      <Outlet />
    </div>
  );
}
