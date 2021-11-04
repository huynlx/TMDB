import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

//check đăng nhập thì mới được vào trang profile
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
