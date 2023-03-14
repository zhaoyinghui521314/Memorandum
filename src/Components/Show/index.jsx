import Wrapper from "../UI/Border";
import showImage from "../../Source/bizhi.jpg";
import "./index.css";
import { useEffect, useState } from "react";

function getBase64Image(url) {
  const img = new Image();
  //因为是网络资源所以会有图片跨域问题产生，此属性可以解决跨域问题，下文详解
  img.setAttribute("crossOrigin", "anonymous");
  //如果需要兼容ios，这两个顺序一定不能换，先设置crossOrigin后设置src
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      //canvas基本配置
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve({
        success: true,
        //canvas.toDataURL的方法将图片的绝对路径转换为base64编码
        base64: canvas.toDataURL(),
      });
    };
    img.onerror = () => {
      reject({ success: false });
    };
  });
}

const Show = (props) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    //调用
    getBase64Image(
      //   "https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg"
      "images/bizhi.jpg"
    ).then((res) => {
      console.log("base64:", res); // {success : true, base64 :'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4A…etGgbgs19tVBD5K/+l/8/4jpK+RseVK4AAAAASUVORK5CYII='}
      setUrl(res.base64);
    });
  }, []);
  return (
    <Wrapper className="show">
      {props.children ? props.children : <img src={url} alt="showImage" />}
    </Wrapper>
  );
};

export default Show;
