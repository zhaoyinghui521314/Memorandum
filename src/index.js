// 入口文件：引入React，ReactDOM
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// const App = <div>
//     <h1>React Hello World</h1>
// </div>;

// 根据html当中的id=root的标签根元素，创建一个对应的react根容器
const root = ReactDOM.createRoot(document.getElementById('root'));

// 将App渲染到根节点root中
root.render(<App/>);