import { useEffect, useState } from "react";
import MyNumber from '../Number/index';
import Wrapper from "../UI/Border";
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

const useGetTimeString = () => {
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
    return timeString;
}

const Clock = (props) => {
    const { isFixed } = props;
    console.log("isFixed:", isFixed);
    const timeString = useGetTimeString();
    const timeArray = timeString.split('');
    console.log("timeArray:", timeArray);
    const timeSpan = timeArray.map(item => {
        return <MyNumber number={item}></MyNumber>;
    }
    )
    return (
        <Wrapper className={`clock ${isFixed ? 'fixed' : ''}`}>   
            {timeSpan}
        </Wrapper>
    )
}

export default Clock;