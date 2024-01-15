import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import {
  pathFriendPage,
  pathHomePage,
  pathHomePageChat,
  pathLoginPage,
  pathNotFoundPage,
  pathProfile,
  pathSettingsPage,
} from './routesConfig';
// import SuspenseFallback from "../components/Common/SuspenseFallback/SuspenseFallback";
import Layout from 'app/components/Layout/Layout';
import { IndexedObject } from 'types/common';
import Loading from 'app/components/Loading/Loading';

export type RoutesProps = {
  exact?: boolean;
  path: string;
  component: React.FC<{
    history: IndexedObject;
    location: IndexedObject;
    match: IndexedObject;
  }>;
  auth?: boolean;
  routes?: Array<RoutesProps>;
  layout?: React.FC<any>;
};

const RenderRoutes = ({
  routes,
  checkAuthLocal,
  currenTUser,
}: {
  routes: Array<RoutesProps>;
  checkAuthLocal: boolean;
  currenTUser: any;
}) => {
  return (
    <Suspense fallback={<Loading loading />}>
      <Switch>
        {routes.map((route, i) => {
          const Layout = route.layout || Fragment;
          const Component = route.component || <div />;
          if (route.auth && !checkAuthLocal) {
            return <Redirect key={i} to={pathLoginPage} />;
          }
          return (
            <Route
              key={i}
              path={route.path}
              exact={!!route.exact}
              render={(props) => {
                return (
                  <Layout>
                    {route.routes ? (
                      <RenderRoutes
                        routes={route.routes}
                        checkAuthLocal={checkAuthLocal}
                        currenTUser={currenTUser}
                      />
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                );
              }}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};

export const routes = [
  {
    exact: true,
    path: pathNotFoundPage,
    component: lazy(() => import('app/pages/Notfound/NotfoundPage')),
  },
  {
    exact: true,
    path: pathLoginPage,
    component: lazy(() => import('app/pages/AuthPage/LoginPage')),
  },
  {
    path: '*',
    layout: Layout,
    component: () => <Redirect to={pathHomePage} />,
    routes: [
      {
        exact: true,
        path: pathFriendPage,
        component: lazy(() => import('app/pages/FriendPage/FriendPage')),
        auth: true,
      },
      {
        exact: true,
        path: pathSettingsPage,
        component: lazy(() => import('app/pages/SettingsPage/SettingsPage')),
        auth: true,
      },
      {
        exact: true,
        path: pathProfile,
        component: lazy(() => import('app/pages/ProfilePage/ProfilePage')),
        auth: true,
      },
      {
        exact: false,
        path: pathHomePageChat,
        component: lazy(() => import('app/pages/HomePage/HomePage')),
        auth: true,
      },
      {
        exact: true,
        path: pathHomePage,
        component: lazy(() => import('app/pages/HomePage/HomePage')),
        auth: true,
      },
      {
        exact: true,
        path: '*',
        component: () => <Redirect to={pathNotFoundPage} />,
      },
    ],
  },
];

export default RenderRoutes;
