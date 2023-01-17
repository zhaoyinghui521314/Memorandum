import { useEffect, useState } from 'react';
import './index.css';

const numberList = new Array(10).fill(0).map((_, i) => i);
const numberReg = /\d/;

const MyNumber = (props) => {
    // console.log("numberReg1:", props.number, typeof(props.number), numberReg.test(props.number), numberReg.test(props.number) ? Number(props.number)*80 : 0);
    const [top, setTop] = useState(numberReg.test(props.number) ? Number(props.number)*80 : 0);
    // console.log("numberReg2:", props.number, typeof(props.number), numberReg.test(props.number), top);
    useEffect(() => {
        if(numberReg.test(props.number)) {
            setTop(Number(props.number)*80);
        }
    }, [props.number])

    // const { number } = props;
    // console.log("number:", number, numberReg.test(number), numberReg.test(number));

    const numberListSpan = numberList.map((item, i) => <span key={i}>{item}</span>);
    return (
        <div className="wrapper">
            {
                // props.number?.toString() == 'NaN'
                !numberReg.test(props.number)
                ?
                (<span>:</span>) :
                (<div className="number" style={{top: `-${top}px`, left: '50%'}}>
                    {numberListSpan}
                </div>)
            }
        </div>
    )
}

export default MyNumber;