import { useState, useEffect } from "react";
import { useAuth } from "../../context/UserContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/api/user-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setOk(res.data.ok);
      } catch (error) {
        console.error("Authorization check failed:", error.message);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
