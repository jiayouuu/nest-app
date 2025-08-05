import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import { lazyLoad } from "@/components/LazyLoad";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: lazyLoad(() => import("@/views/playground")),
        },
        {
          path: "auth/login",
          element: lazyLoad(() => import("@/views/auth/login")),
        },
        {
          path: "auth/register",
          element: lazyLoad(() => import("@/views/auth/register")),
        },
      ],
    },
    {
      path: "404",
      element: <div>404</div>,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ],
  {
    basename: import.meta.env.VITE_ROUTE_BASE,
  }
);

export default router;
