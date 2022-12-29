import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Wrapper from '../Border';
import Backdrop from '../Backdrop';
import Circle from '../../Circle';
import './index.css';


const p = document.getElementById('portal');

const Confirm = (props) => {
    const [deg, setDeg] = useState(0);
    const [close, setClose] = useState(false);
    console.log("updata");
    useEffect(() => {
        const timer = setInterval(() => {
            setDeg((temp) => {
                // console.log("temp", temp);
                if(temp > 99) {
                    clearInterval(timer);
                    // 设置函数自己的中间变量来判断 =》是否进行执行props的函数，
                    setClose(true);
                    // 错误写法：props.onCancel() 
                    // 因为只要props传来的只有不是包含setState()修改父组件的操作就不会警告，
                    // 因为这种操作需要直接在useEffect中执行，而不要在回调函数中执行, 不是不能在setInteral()回调调用
                    // 好像是因为不能再这个子set()里面调用父的set()
                    props.test();
                    return 100;
                }else {
                    return temp+10;
                }
            })
        }, 500)
        return () => {
            // 相当于开辟了一个栈，如果开启了其他的useEffect()则重新开栈
            console.log("我销毁了2");
        }
        // props.onCancel();
    }, [])
    useEffect(() => {
        console.log("close更新了");
        let t;
        if(close) {
            t = setInterval(() => {
                console.log("中间timeout执行");
                props.onCancel();
            }, 5000);
            // props.onCancel();
        }
        // 每次执行完就销毁了
        return () => {
            console.log("我销毁了");
            clearInterval(t);
        }
    }, [close]);
    // 问题复现：
    // useEffect(() => {
    //     // 直接这样又可以，所以也好像不是因为不能再这个子set()里面调用父的set()
    //     // setDeg(temp => {
    //     //     console.log("temp", temp);
    //     //     props.onCancel();
    //     // })
    //     // 感觉是因为子set()重新渲染数据后，得到的数据重新render再去去修改父set()就会有问题： 不能在渲染Confirm组件的时候去更新Item组件
    //     // Warning: Cannot update a component (`Item`) while rendering a different component (`Confirm`).
    //     setDeg(temp => {
    //         console.log("temp", temp);
    //         if(temp == 3) {
    //             props.onCancel();
    //         }else {
    //             return temp+1;
    //         }
    //     }) 
    // }, [deg])
    
    const backdropClick = (e) => {
        // e.stopPropagation();
        console.log("backdrop click", e);
    }

    const testClick = (e) => {
        e.stopPropagation();
        console.log("test click", e);                         
    }
    return ReactDOM.createPortal((
        <Backdrop onClick={backdropClick}>
            <Wrapper className="Confirm">
                <div className='test' ></div>
                <div className="content" onClick={testClick}>{props.content}</div>
                <div className='confirm-btn'>
                    <Circle deg={deg} onClick={props.onCancel}/>
                    <button onClick={props.onConfirm}>确定</button>
                    <button onClick={props.onCancel}>取消</button>
                </div>
            </Wrapper>
        </Backdrop>
    ), p);
}

export default Confirm;