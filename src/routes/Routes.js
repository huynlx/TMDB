import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import * as Page from "../constants/AllRoutes";
import PublicRoute from "../helpers/PublicRoute";
import PrivateRoute from "../helpers/PrivateRoute";
import Loader from "../components/Loading/Loader";

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={Page.Home}></Route>
        <Route
          path="/:mediaType/:id-:title/videos/:type"
          component={Page.Videos}
        ></Route>
        <Route
          path="/:mediaType/:id-:title/images/:type"
          component={Page.Images}
        ></Route>
        <Route path="/company/:id" component={Page.Company}></Route>
        <Route path="/collection/:id" component={Page.Collection}></Route>
        <Route path="/tv/:id-:title/cast" component={Page.PeopleTv}></Route>
        <Route path="/tv/:id-:title/watch" component={Page.Watch}></Route>
        <Route path="/tv/:id-:title" component={Page.Tv}></Route>
        <Route path="/person/:id-:name" component={Page.Person}></Route>
        <Route path="/movie/:id-:title/cast" component={Page.People}></Route>
        <Route path="/movie/:id-:title/watch" component={Page.Watch}></Route>
        <Route path="/movie/:id-:title" component={Page.Movie}></Route>
        <Route path="/genre/:id-:name/:type" component={Page.Keyword}></Route>
        <Route path="/keyword/:id-:name" component={Page.Keyword}></Route>
        <Route path="/search/:type/:query/:page" component={Page.Search}></Route>
        <Route path="/:type/:page" component={Page.Popular}></Route>
        <PublicRoute path="/login" component={Page.Login}></PublicRoute>
        <PublicRoute path="/signup" component={Page.Signup}></PublicRoute>
        <PrivateRoute path="/profile" component={Page.Profile}></PrivateRoute>
        <Route path="*" component={Page.Error}></Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
