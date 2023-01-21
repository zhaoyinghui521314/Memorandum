import { useState, useEffect } from "react";
import axios from "axios";
import Wrapper from "../UI/Border";
import Item from "../Item";
import Header from "../Header";

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

const List = (props) => {
    const name = ['早上', '中午', '晚上'];
    const { loading, error, da: fetchdata, fetchData} = useQuery();
    const [data, setData] = useState([]);
    const tableItem = data?.map((item, i) =>  {
        return (
            <div>
                {i % 3 == 0  && <div className='time'>{name[i/3]}</div>}
                <Item {...item} key={item.id} del={() => del(item.id)}/>
            </div>
        )
    });
    const noItem = <div style={{color: "Red", textAlign: "center"}}>暂时没有制定学习计划</div>
    const loadingItem = <div>loading</div>;
    const errorItem =  <div>error</div>;

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
        props.setId(dealData.length);
    }, [fetchdata])

    return (
        <Wrapper className='table'>
            <Header />
            {loading && loadingItem}
            {error && errorItem}
            {tableItem.length ? tableItem : noItem}
        </Wrapper>
    )
}

export default List;