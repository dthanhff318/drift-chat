import Layout from 'app/components/Layout/Layout';
import Loading from 'app/components/Loading/Loading';
import React, { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IndexedObject, TUser } from 'types/common';
import {
  pathExtendPage,
  pathFriendPage,
  pathHomePage,
  pathHomePageChat,
  pathNotFoundPage,
  pathObj,
  pathProfile,
  pathProfileFriend,
} from './routesConfig';

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
  currentUser,
}: {
  routes: Array<RoutesProps>;
  checkAuthLocal: boolean;
  currentUser: TUser;
}) => {
  return (
    <Suspense fallback={<Loading loading />}>
      <Switch>
        {routes.map((route, i) => {
          const Layout = route.layout || Fragment;
          const Component = route.component || <div />;
          if (route.auth && !checkAuthLocal) {
            return <Redirect key={i} to={pathObj.loginPage} />;
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
                        currentUser={currentUser}
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
    path: pathObj.welcomePage,
    component: lazy(() => import('app/pages/WelcomePage/WelcomePage')),
  },
  {
    exact: true,
    path: pathNotFoundPage,
    component: lazy(() => import('app/pages/Notfound/NotfoundPage')),
  },
  {
    exact: true,
    path: pathObj.loginPage,
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
        path: pathExtendPage,
        component: lazy(() => import('app/pages/ExtendPage/ExtendPage')),
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
        path: pathProfileFriend,
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
