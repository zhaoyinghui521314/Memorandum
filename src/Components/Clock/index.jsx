import { isNumber, now } from "lodash";
import { useEffect, useState } from "react";
import MyNumber from '../Number/index';
import Wrapper from "../UI/Border";
// import Card from "../Card";
import './index.css';

const dateTostring = (nowDate) => {
    const hour = nowDate.getHours();
    const min = nowDate.getMinutes();
    console.log("nowDate time:", hour, min);
    const hourString = hour < 10 ? `0${hour}` : hour.toString();
    const minString = min < 10 ? `0${min}` : min.toString();
    console.log("nowDate timeString:", hourString, minString);
    return `${hourString}:${minString}`;
}

const Clock = () => {
    const [timeString, setTimeString] = useState(dateTostring(new Date()));
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("nowDate", new Date(), date);
            const nowDate = new Date();
            setDate(nowDate);
            setTimeString(dateTostring(nowDate));
        }, 60000)
        return () => {
            console.log("clear nowDate:");
            clearTimeout(timer);
        }
    }, [date])
    const timeArray = timeString.split('');
    console.log("timeArray:", timeArray);
    const timeSpan = timeArray.map(item => {
        console.log("number transform:", Number(item));
        return <MyNumber number={Number(item)}></MyNumber>;
    }
    )
    return (
        <Wrapper className={'clock'}>   
            {timeSpan}
        </Wrapper>
    )
}

export default Clock;