import { useState } from "react";
import { Button, Input } from "antd";
import style from "./index.module.scss";

const Demo = () => {
  const [value, setValue] = useState("");
  return (
    <div className={style.root}>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <div>{value}</div>
      <Button onClick={() => setValue("")}>reset</Button>
    </div>
  );
};
export default Demo;
