import { set } from "lodash";
import { useState } from "react";
import "./index.css";

const Header = (props) => {
  const [line, setLine] = useState(0);
  const [number, setNumber] = useState(0);
  const name = ["早上", "中午", "晚上"];
  const dist = [70, 220, 370];
  const { map } = props;
  const scrollTo = (id) => {
    const node = map.get(id);
    console.log("node:", node);
    node.scrollIntoView({
      behavior: "smooth",
    });
  };
  const toggleHandle = (index) => {
    return () => {
      setNumber(index);
      setLine(index);
      // 跳转到对应的scroll
      scrollTo(index * 3);
    };
  };
  const nameItem = name.map((_, index) => {
    return (
      <li key={index} onClick={toggleHandle(index)} className="li">
        {name[index]}
        <span
          key={index}
          className={`line ${line == index && "lineShow"}`}
        ></span>
      </li>
    );
  });
  return (
    <ul style={{ "--leftOffset": `${dist[number]}px` }} className="list">
      {nameItem}
      <div className="circle"></div>
    </ul>
  );
};

export default Header;
