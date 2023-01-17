import { useEffect, useState } from 'react';
import './index.css';

const numberList = new Array(10).fill(0).map((_, i) => i);
const numberReg = /\d/;

const MyNumber = (props) => {
    // state中将props值作为依赖，但是props改变之后会直接也会重新渲染，并不用去effect了
    // console.log("numberReg1:", props.number, typeof(props.number), numberReg.test(props.number), numberReg.test(props.number) ? Number(props.number)*80 : 0);
    // const [top, setTop] = useState(numberReg.test(props.number) ? Number(props.number)*80 : 0);
    // // console.log("numberReg2:", props.number, typeof(props.number), numberReg.test(props.number), top);
    // useEffect(() => {
    //     if(numberReg.test(props.number)) {
    //         setTop(Number(props.number)*80);
    //     }
    // }, [props.number])

    const { number } = props;
    const top = numberReg.test(props.number) ? Number(number)*80 : 0;

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