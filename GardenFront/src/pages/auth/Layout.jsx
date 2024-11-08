import { Outlet } from "react-router";

export default function Layout() {

    return <div className="p-2 grid place-items-center">
        <Outlet />
    </div>
}