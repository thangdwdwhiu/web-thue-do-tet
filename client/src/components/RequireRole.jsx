import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";


export default function RequireRole({roles = []}) {

    const {user, auth} = useSelector(state => state.auth);

    if (auth.loading || !user.user) 
        return <Loading title={"please wait...."} />

    const role  = user?.user?.role ?? "user";

    if (!roles.includes(role)){
        return <Navigate to={"/"} replace/>
    }

    return <Outlet />


}