import { useEffect, useState, useRef } from 'react';
import Form from '../Form';
import Clock from '../Clock';
import Show from '../Show';
import List from '../List';
import './index.css';
import axios from '../../Api/request';
import './index.css';

/**
 * 封装组件吸顶的方法
 * @returns isFixe吸顶的组件状态，formRef判断何时吸顶的组件
 */
const useCeiling = () => {
    // Clock吸顶
    const [isFixed, setIsFixed] = useState(false);
    const formRef = useRef(null);
    const scroll = () => {
        const { top } = formRef.current.getBoundingClientRect();
        setIsFixed(top < 120);
    }

    useEffect(() => {
        window.addEventListener("scroll", scroll);
        return () => {
            console.log("remove scroll");
            window.removeEventListener(scroll);
        }
    }, [])
    return {
        isFixed,
        formRef
    }
}

const Table = () => {
    const [id, setId] = useState(0);
    const { isFixed, formRef } = useCeiling();
    
    const del = (id) => {
        // setData(data.filter((item) => item.id != id));
        console.log("del id:", id);
        // const res = await axios.delete(`http://localhost:1337/api/tests/${id}`);
        // console.log("del res", res);
        // if(res.status === 200) {
        //     console.log("del success!");
        //     fetchData();
        // }
        axios.delete(`http://localhost:1337/api/tests/${id}`).then(res => {
            if(res.status === 200) {
                console.log("del success!");
                fetchData();
            }
        })

    }
    const add = async (newData) => {
        // const date = new Date(newData.date);
        // const copyData = [...data];
        // copyData.push({...newData,  id: `${id}`, date: date});
        // console.log("copyData", copyData);
        // setData(copyData);
       
        console.log("newData:", newData);
        const dealData = {Date: newData.date, Context: newData.context, Min: newData.min, Idd: `${id}`};
        console.log("new deal data:", dealData);
        const res = await axios.post('http://localhost:1337/api/tests', {data: dealData});
        console.log("post res:", res);
        // 重新获取数据 =》 更新页面
        fetchData();
        setId(id+1);
    }
    return (
        <div className='allWrapper'>
            <Show />
            <Clock isFixed={isFixed}/>
            <Form ref={formRef} isFixed={isFixed} id={id} add={add} />
            <List setId={setId}/>
        </div>
    )
}

export default Table;