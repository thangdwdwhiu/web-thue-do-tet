import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
import { checkAuth } from "../features/authSlice";

export default function AuthRoute(){
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.auth);
    
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
    
    if (auth.loading) {
        return <Loading title={"Đang tải"} />
    }

    if (!auth.isLogin) {
        return <Navigate to="/auth" replace />
    }

    return <Outlet />
}