import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

//ngăn vào login,signup khi đã đăng nhập
const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to="/profile" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
