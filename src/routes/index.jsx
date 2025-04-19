import { Suspense } from "react";
import Layout from "@/layout";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import routesConfig from "./routes.config";
import _404 from "@/components/common/_404";
import routesConstants from "./routesConstants";
import Loader from "@/components/common/loaders/Loader";
import {
  Route,
  Routes as ReactRouterDomRoutes,
  Navigate,
} from "react-router-dom";

const Common = (route) => (
  <Suspense fallback={<Loader />}>
    <route.component />
  </Suspense>
);

Common.prototype = {
  component: PropTypes.elementType.isRequired,
};

const Public = (route) => {
  return (
    <Suspense fallback={<Loader />}>
      <route.component />
    </Suspense>
  );
};

Public.prototype = {
  ...Common.prototype,
};

const Private = (route) => {
  const { component: Component } = route;
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

Private.prototype = {
  ...Common.prototype,
};

const createNestedRoutes = (routes, RouteType) => {
  return routes.map((route, i) => {
    if (!route.component) {
      throw new Error("Component must be required....");
    }
    if (route.children) {
      return (
        <Route path={route.path} key={i} element={<RouteType {...route} />}>
          {createNestedRoutes(route.children, RouteType)}
        </Route>
      );
    } else {
      return (
        <Route
          key={i}
          index={route.index}
          path={route.path}
          element={<RouteType {...route} />}
        />
      );
    }
  });
};

const Routes = () => {
  const { isAuth } = useSelector((state) => state.login);
  const { common, private: privateRoutes, public: publicRoutes } = routesConfig;
  return (
    <ReactRouterDomRoutes>
      {isAuth ? (
        <>
          <Route
            index
            path="/"
            element={<Navigate to={routesConstants?.DASHBOARD} />}
          />
          <Route path="/" element={<Layout />}>
            {createNestedRoutes(privateRoutes, Private)}
          </Route>
          <Route path="*" element={<_404 />} />
        </>
      ) : (
        <>
          <Route
            index
            path="/"
            element={<Navigate to={routesConstants.LOGIN} />}
          />
          {createNestedRoutes(publicRoutes, Public)}
          <Route path="*" element={<Navigate to={routesConstants.LOGIN} />} />
        </>
      )}

      {createNestedRoutes(common, Common)}
    </ReactRouterDomRoutes>
  );
};

export default Routes;
