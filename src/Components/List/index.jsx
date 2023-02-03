import { useState, useEffect, useRef } from "react";
import { throttle } from 'lodash';
import axios from "axios";
import Wrapper from "../UI/Border";
import Item from "../Item";
import Header from "../Header";
import Skelon from "../Skelon";
import './index.css';
import Loading from "../Loading";

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
            setTimeout(() => {
                setLoading(false);
            }, 6000)
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
 * 
 * @param {*} allRef 列表的ref,查询用的
 * @param {*} midRef 标杆的ref,到这个刻度
 * @param {*} map 制作好的map
 * @returns 返回哪个刻度
 */
const useGetScrollNumber = (allRef, midRef, map) => {
    console.log("useGetScrollNumber:", allRef, midRef, map, map.length);
    const [scrollNumber, setScrollNumber] = useState(0);
    const scrollFun = (t) => {
        // 1: ref callback => map
        for(const [k, v] of map.current) {
            const { top: topTime } = v.getBoundingClientRect();
            if(topTime < t) {
                setScrollNumber(k/3);
            }
        }

        // 2: ref => querySelectorAll
        const node = allRef.current.querySelectorAll('.time'); 
        // 从前往后，依次都要进行set消耗性能,
        // node.forEach((item, i) => {
        //     const { top: topTime } = item.getBoundingClientRect();
        //     if(topTime < t) {
        //         setScrollNumber(i);
        //     }
        // })

        // for(let i = node.length - 1; i >= 0; i--) {
        //     const { top: topTime } = node[i].getBoundingClientRect();
        //     if(topTime < t) {
        //         setScrollNumber(i);
        //         // 优化性能！
        //         break;
        //     }
        // }
    }
    useEffect(() => {
        const { top: topMid } = midRef.current.getBoundingClientRect();
        const test = midRef.current.querySelectorAll('span');
        console.log("topMid:", topMid, test);
        window.addEventListener("scroll", () => scrollFun(topMid));
        return () => {
            console.log("scoll leave");
            window.removeEventListener("scroll",  () => scrollFun(topMid));
        }
    }, [])
    return {scrollNumber};
}

/**
 * 
 * @returns 实时监听返回当前窗口的长度
 */
const useGetWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        '--color': 'pink'
    });
    const handleWindowSize = throttle((e) => {
        let htmlClientWidth = document.documentElement.clientWidth;
        // document.documentElement不包含滚动条, window.target.innerWidth包含滚动条
        console.log("ee:", e, e.target.innerWidth, e.target.innerHeight);
        setWindowSize({
            '--windowSize':  `${htmlClientWidth*0.9}px`,
            '--color': 'pink'
    })}, 2000)

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        return () => {
            window.removeEventListener('resize', handleWindowSize);
        }
    }, []);
    return {windowSize};
}

const List = (props) => {
    const name = ['早上', '中午', '晚上'];
    const { loading, error, da: fetchdata, fetchData} = useQuery();
    const [data, setData] = useState([]);
    const map = useRef(new Map());
    const tableItem = data?.map((item, i) =>  {
        return (
            <div>
                {i % 3 == 0  && <div key={`${i}123`} ref={(node) => {
                    if(node) {
                        map.current.set(i, node);
                    }else {
                        map.current.delete(i);
                    }
                }} className='time'>{name[i/3]}</div>}
                <Item {...item} key={item.id} del={() => del(item.id)}/>
            </div>
        )
    });
    const noItem = <div style={{color: "Red", textAlign: "center"}}>暂时没有制定学习计划</div>
    const errorItem =  <div>error</div>;

    const midRef = useRef(null);
    const allRef =  useRef(null);
    const { scrollNumber } = useGetScrollNumber(allRef, midRef, map);
    const { windowSize } = useGetWindowSize();
    console.log("ee windowSize:", windowSize);
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
        <div>
            <Wrapper className='table'>
                <Header map={map.current} number={scrollNumber}/>
                {loading && 
                <div>
                    <Loading />
                    <Skelon />
                </div>
                }
                {error && errorItem}
                <div ref={allRef}>
                    {!loading && (tableItem.length ? tableItem : noItem)}
                </div>
                <div style={{...windowSize, '--test': 'blue'}} className="mid" ref={midRef}>
                    <span style={{color: 'red', marginTop: '10px', display: "inline-block"}}> 滑动窗口:</span>
                    <span style={{color: 'red', fontWeight: 'bold'}}> {scrollNumber}</span>
                </div>
            </Wrapper>
        </div>
    )
}

export default List;