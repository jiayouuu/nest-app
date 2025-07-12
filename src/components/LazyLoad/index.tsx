import { lazy, Suspense, type JSX } from "react";
import { Spin } from "antd";
import style from "./index.module.scss";
export function lazyLoad(
  loader: () => Promise<{ default: React.ComponentType }>
): JSX.Element {
  const Component = lazy(loader);
  return (
    <Suspense
      fallback={
        <div className={style.root}>
          <Spin size="large" />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}
