import { useEffect } from "react";
import useStore from "./Store";
import { useNavigate } from "react-router-dom";

const PageAuthentication = () => {
  const isLogin = useStore((state) => state.isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return(null)
};

export default PageAuthentication;
