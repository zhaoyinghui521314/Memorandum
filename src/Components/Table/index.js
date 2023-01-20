import { useEffect, useState, useRef } from 'react';
import Item from '../Item';
import Wrapper from '../UI/Border';
import Form from '../Form';
import Clock from '../Clock';
import Show from '../Show';
import './index.css';
import axios from '../../Api/request';
import './index.css';

const d = [
    {
        id: "1",
        date: new Date(),
        context: "学习React",
        min: "60分钟",
    },
    {
        id: "2",
        date: new Date(2022, 4, 22, 4, 30),
        context: "学习Css",
        min: "50分钟",
    },
    {
        id: "3",
        date: new Date(2022, 5, 23, 4, 30),
        context: "学习每日一读",
        min: "40分钟",
    },
    {
        id: "4",
        date: new Date(2022, 6, 24, 4, 30),
        context: "学习leetcode",
        min: "60分钟",
    },
]

/**
 * 封装查询的方式：包括加载、失败的状态
 * @returns 返回四个指标
 */
const useQuery = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [da, setData] = useState([]);
    console.log("queryx", loading, error, da);
    
    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null);
            const res = await axios.get('http://localhost:1337/api/tests');
            if(res.status === 200) {
                console.log("axios res:", res);
                setData(res.data.data);
            }else{
                throw new Error("Fetch Data Error!");
            }

        }catch(e){
            console.log("Catch error:", e);
            setError(e);
        }finally{
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        da,
        fetchData,
    }
}

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
    // console.log("data1", d, typeof(d[1].date));
    useEffect(() => {
        console.log("useEffect fetch:");
        // fetch('http://localhost:1337/api/tests').then(res => {
        //     console.log("res", res);
        // })
        // fetch('http://localhost:1337/api/tests')
        //     .then(
        //         function(response) {
        //         console.log("response", response);
        //         if (response.status !== 200) {
        //             console.log('Looks like there was a problem. Status Code: ' +
        //             response.status);
        //             return;
        //         }
        //         const json = response.json();
        //         console.log("json", json);
        //         // Examine the text in the response
        //         json.then(function(data) {
        //             console.log(data);
        //         });
        //         }
        //     )
        //     .catch(function(err) {
        //         console.log('Fetch Error :-S', err);
        //     });

        console.log("useEffect axios");
        // axios.get('http://localhost:1337/api/tests').then(res => {
        //     console.log("res", res.data.data);
        //     const fetchData = res.data.data;
        //     console.log("fetchData:", res, fetchData);
        //     const dealData = fetchData.map(item => 
        //         {
        //             console.log("item", item);
        //             const newItem = {
        //                 id: item.id, 
        //                 date: item.attributes.Date, 
        //                 context: item.attributes.Context, 
        //                 min: item.attributes.Min
        //             };
        //             return newItem;
        //     })
        //     console.log("dealData", dealData);
        //     setData(dealData);
        // })
    }, [])
    // console.log("data2", d, typeof(d[1].date));
    // const [data, setData] = useState(d);
      // const [data, setData] = useState([]);
   
    const { loading, error, da: fetchdata, fetchData} = useQuery();
    const [id, setId] = useState(0);
    const [data, setData] = useState([]);
    console.log("useQueryx:", loading, error, fetchdata);

    const { isFixed, formRef } = useCeiling();

    useEffect(() => {
        fetchData();
    }, [])

    // 中间数据的桥接，fetchData()更新请求数据 =》 fetchdata数据改变了 =》 重新处理对应的数据展示
    useEffect(() => {
        console.log("dealDdata lengthx:", data.length);
        const dealData = fetchdata.map(item => 
            {
                console.log("item", item);
                const newItem = {
                    id: item.id, 
                    date: item.attributes.Date, 
                    context: item.attributes.Context, 
                    min: item.attributes.Min
                };
                return newItem;
        })
        console.log("dealDatax",fetchdata, dealData);
        setData(dealData);
        setId(dealData.length);
    }, [fetchdata])
    
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

    // console.log("data", data);
    const tableItem = data?.map(item => <Item {...item} key={item.id} del={() => del(item.id)}/>);
    const noItem = <div style={{color: "Red", textAlign: "center"}}>暂时没有制定学习计划</div>
    const loadingItem = <div>loading</div>;
    const errorItem =  <div>error</div>;
    // console.log("data3", d, typeof(d[1].date));
    console.log("id:", id);
    return (
        <div className='allWrapper'>
            <Show />
            <Clock isFixed={isFixed}/>
            <Form ref={formRef} isFixed={isFixed} id={id} add={add} />
            <Wrapper className='table'>
                {loading && loadingItem}
                {error && errorItem}
                {tableItem.length ? tableItem : noItem}
            </Wrapper>
        </div>
    )
}

export default Table;