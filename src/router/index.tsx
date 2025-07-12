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
          path: "demo",
          element: lazyLoad(() => import("@/views/Demo")),
        },
      ],
    },
    {
      path: "/404",
      element: <div>404</div>,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_UR,
  }
);

export default router;
