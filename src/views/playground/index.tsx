import { useState, type FC } from "react";
import styles from "./index.module.scss";
// 定义拖拽尺寸对象
type Dimensions = {
  top: number;
  left: number;
  width: number;
  height: number;
};
// 定义拖拽选项对象
type Options = {
  borderWidth: number;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
};
// 定义组件属性类型
type Props = {
  dimensions?: Partial<Dimensions>;
  options?: Partial<Options>;
  onResize?: (dimensions: Dimensions) => void;
};
const Playground: FC<Props> = (props) => {
  // 设置默认尺寸
  const dimensions: Dimensions = {
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    ...(props.dimensions ?? {}),
  };
  // 设置默认选项
  const options: Options = {
    borderWidth: 10,
    minWidth: 50,
    minHeight: 50,
    maxWidth: 200,
    maxHeight: 200,
    ...(props.options ?? {}),
  };
  // 使用 useState 跟踪尺寸
  const [left, setLeft] = useState(dimensions.left);
  const [top, setTop] = useState(dimensions.top);
  const [width, setWidth] = useState(dimensions.width);
  const [height, setHeight] = useState(dimensions.height);
  // 记录拖拽状态
  let isDragging = false;

  /**
   * @description: 通用的拖拽处理函数,处理拖拽事件监听
   * @param {function} onMouseMove
   */
  const handleMove = (onMouseMove: (moveEvent: MouseEvent) => void) => {
    isDragging = true;
    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  /**
   * @description: 顶部拖拽处理函数
   * @param {React} e
   */
  const topMove = (e: React.MouseEvent) => {
    const offsetY = e.clientY - top;
    return (moveEvent: MouseEvent) => {
      if (!isDragging) return;
      const newTop = moveEvent.clientY - offsetY;
      const newHeight = height + (top - newTop);
      if (newHeight <= options.minHeight || newHeight >= options.maxHeight)
        return;
      setHeight(newHeight);
      setTop(newTop);
    };
  };
  /**
   * @description: 右侧拖拽处理函数
   * @param {React} e
   */
  const rightMove = (e: React.MouseEvent) => {
    const offsetX = e.clientX - (left + width);
    return (moveEvent: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = moveEvent.clientX - left - offsetX;
      if (newWidth <= options.minWidth || newWidth >= options.maxWidth) return;
      setWidth(newWidth);
    };
  };
  /**
   * @description: 底部拖拽处理函数
   * @param {React} e
   */
  const bottomMove = (e: React.MouseEvent) => {
    const offsetY = e.clientY - (top + height);
    return (moveEvent: MouseEvent) => {
      if (!isDragging) return;
      const newHeight = moveEvent.clientY - top - offsetY;
      if (newHeight <= options.minHeight || newHeight >= options.maxHeight)
        return;
      setHeight(newHeight);
    };
  };
  /**
   * @description: 左侧拖拽处理函数
   * @param {React} e
   */
  const leftMove = (e: React.MouseEvent) => {
    const offsetX = e.clientX - left;
    return (moveEvent: MouseEvent) => {
      if (!isDragging) return;
      const newLeft = moveEvent.clientX - offsetX;
      const newWidth = width + (left - newLeft);
      if (newWidth <= options.minWidth || newWidth >= options.maxWidth) return;
      setWidth(newWidth);
      setLeft(newLeft);
    };
  };
  /**
   * @description: 整体拖拽处理函数
   * @param {React} e
   */
  const contentMove = (e: React.MouseEvent) => {
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    return (moveEvent: MouseEvent) => {
      if (!isDragging) return;
      const newLeft = moveEvent.clientX - offsetX;
      const newTop = moveEvent.clientY - offsetY;
      setLeft(newLeft);
      setTop(newTop);
    };
  };
  return (
    <>
      <div
        className={styles.topBorder}
        style={{
          width,
          height: options.borderWidth,
          left: left + options.borderWidth,
          top,
        }}
        onMouseDown={(e) => handleMove(topMove(e))}
      />
      <div
        className={styles.rightBorder}
        style={{
          height,
          width: options.borderWidth,
          left: left + width + options.borderWidth,
          top: top + options.borderWidth,
        }}
        onMouseDown={(e) => handleMove(rightMove(e))}
      />
      <div
        className={styles.bottomBorder}
        style={{
          width,
          height: options.borderWidth,
          left: left + options.borderWidth,
          top: top + height + options.borderWidth,
        }}
        onMouseDown={(e) => handleMove(bottomMove(e))}
      />
      <div
        className={styles.leftBorder}
        style={{
          height,
          width: options.borderWidth,
          left,
          top: top + options.borderWidth,
        }}
        onMouseDown={(e) => handleMove(leftMove(e))}
      />
      <div
        className={styles.leftTopAngle}
        style={{
          width: options.borderWidth,
          height: options.borderWidth,
          top,
          left,
        }}
        onMouseDown={(e) => {
          handleMove(leftMove(e));
          handleMove(topMove(e));
        }}
      />
      <div
        className={styles.rightTopAngle}
        style={{
          width: options.borderWidth,
          height: options.borderWidth,
          top,
          left: left + width + options.borderWidth,
        }}
        onMouseDown={(e) => {
          handleMove(rightMove(e));
          handleMove(topMove(e));
        }}
      />
      <div
        className={styles.leftBottomAngle}
        style={{
          width: options.borderWidth,
          height: options.borderWidth,
          top: top + height + options.borderWidth,
          left,
        }}
        onMouseDown={(e) => {
          handleMove(leftMove(e));
          handleMove(bottomMove(e));
        }}
      />
      <div
        className={styles.rightBottomAngle}
        style={{
          width: options.borderWidth,
          height: options.borderWidth,
          top: top + height + options.borderWidth,
          left: left + width + options.borderWidth,
        }}
        onMouseDown={(e) => {
          handleMove(rightMove(e));
          handleMove(bottomMove(e));
        }}
      />
      <div
        className={styles.content}
        style={{
          left: left + options.borderWidth,
          top: top + options.borderWidth,
          width,
          height,
        }}
        onMouseDown={(e) => handleMove(contentMove(e))}
      />
    </>
  );
};

export default Playground;
