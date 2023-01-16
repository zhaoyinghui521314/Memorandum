import { useEffect, useState } from 'react';
import './index.css';

const numberList = new Array(10).fill(0).map((_, i) => i);

const MyNumber = (props) => {
    const [top, setTop] = useState(props.number*80);
    console.log("number: ", props.number);
    useEffect(() => {
        setTop(props.number*80);
        // const timer = setTimeout(() => {
        //     setTop(props.number*60);
        // }, 1000);
        // return () => {
        //     clearTimeout(timer);
        // }
    }, [props.number])
    const numberListSpan = numberList.map((item, i) => <span key={i}>{item}</span>);
    return (
        <div className="wrapper">
            {
                props.number?.toString() == 'NaN'
                ?
                <span>:</span> :
                <div className="number" style={{top: `-${top}px`, left: '50%'}}>
                    {numberListSpan}
                </div>
            }
        </div>
    )
}

export default MyNumber;