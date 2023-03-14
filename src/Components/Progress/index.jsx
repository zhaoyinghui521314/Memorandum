import { useEffect, useRef, useState } from "react";
import Wrapper from "../UI/Border";
import "./index.css";

const Progresss = () => {
  const [n, setN] = useState(1);
  const flag = true;
  const number = [1, 2, 3, 4];
  const lineRef = useRef(null);
  const handleForward = () => {
    if (n < number.length) {
      setN((n) => n + 1);
    }
  };
  const handleBack = () => {
    if (n > 1) {
      setN((n) => n - 1);
    }
  };
  useEffect(() => {
    lineRef.current.style.width = ((n - 1) / (number.length - 1)) * 100 + "%";
  }, [n]);

  return (
    <Wrapper className="progress">
      <div className="pro-show">
        <div ref={lineRef} className="pro-line"></div>
        {number.map((item, index) => (
          <div
            className={`pro-number ${index <= n - 1 ? "activate" : ""}`}
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="pro-btn">
        <button disabled={n == 1} onClick={handleBack}>
          后退
        </button>
        <button disabled={n == 4} onClick={handleForward}>
          前进
        </button>
      </div>
    </Wrapper>
  );
};

export default Progresss;
