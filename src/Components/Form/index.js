import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import Wrapper from '../UI/Border'
import './index.css';

let time = null;

const useDebounce = (value, time) => {
    // console.log("useDebounce进来了1", value)
    const [dd, setDd] = useState(value);
    // console.log("useDebounce进来了2", dd, value)
    useEffect(() => {
        // console.log("useEffect进来了");
        const t = setTimeout(() => {
            console.log("自定义hook延时");
            setDd(value);
        }, time);
        // return清楚前面的定时器，不让目前的dd返回是关键，只有最后的防抖值返回了执行其他任务
        return () => {
            console.log("useEffect结束了");
            clearTimeout(t)
        };
    }, [value])
    // console.log("useDebounce返回了", dd);
    return dd;
}

const Form = React.forwardRef((props, ref) => {
    console.log("formRef1", ref);
    const [data, setData] = useState({date: '', context: '', min: ''});
    console.log("data", data);
    const log = useCallback(debounce((v) => {console.log("延时", v);}, 3000), []);
    const handleDate = (e) => {
        // const newDate = new Date(e.target.value);
        // console.log("e", e.target.value, typeof(e.target.value));
        const dealData = e.target.value;
        // console.log("dealData1:", dealData, typeof(dealData));
        setData({...data, date: dealData});
    }
    const handlePlan = (e) => {
        // console.log("e", e.target.value);
        setData({...data, context: e.target.value});
    }

    // 方式一：更新数据+自定义Hooks新建变量+useEffect执行其他任务
    const dd = useDebounce(data.min, 5000);
    const handleMin = (e) => {
        setData({...data, min: e.target.value});
    }

    useEffect(() => {
        console.log("延时了", data, dd);
        return () => {
            console.log("什么时候结束啊！");
        }
    }, [dd]);

    // const handleMin = (e) => {
    //     // 错误写法： 延时更新state错误，set不能写在延时当中都不会执行, 
    //     // 上面错了，会执行的只不过更新的不行，值为空所以不更新组件看不到logs输出
    //     if(time) clearTimeout(time);
    //     time = setTimeout(() => {
    //         console.log("延时");
    //         setData({...data, min: 'aaa'});
    //     }, 3000);
    // }

    /* 方式二：更新数据+定时器延时执行其他任务
    const handleMin = (e) => {
        console.log("e", e.target.value);
        // 更新肯定是每一次都更新，不能放入延时的
        setData({...data, min: e.target.value});
        // 方式一：调用debounce函数，但不加callback的话，还是延迟加多次
        log(e.target.value);
        // 方式二：自己写延时器，但不清除原来的延时器，还是会延迟加多次
        if(time) clearTimeout(time);
        time = setTimeout(() => {
            // 如果想获取的话需要加上，因为异步函数获取值
            e.persist();
            // 这里防抖需要等一下在执行另外的操作，只会延迟加一次
            console.log("延时了", e.target.value, data);
        }, 5000);
    }
    */
    
    const handleAdd = () => {
        props.add(data);
        setData({date: '', context: '', min: ''});
    }
    return (
        <Wrapper ref={ref} className={`form ${props.isFixed ? 'fixedTop': ''}`}>
          <form>
            <div className='formItem'>
                <label htmlFor="date">日期:</label>
                <input id="date" type="date" value={data.date} onChange={handleDate}></input>
            </div>
            <div className='formItem'>
                <label htmlFor="plan">计划:</label>
                <input id="plan" value={data.context } onChange={handlePlan}></input>
            </div>
            <div className='formItem'>
                <label htmlFor="min">时长:</label>
                <input id="min" value={data.min} onChange={handleMin}></input>
            </div> 
            <div className='formBtn'>
                <Wrapper className='btnn' onClick={handleAdd}>增加</Wrapper>
            </div>
          </form>
        </Wrapper>
    )
})

export default Form;