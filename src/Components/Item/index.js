import { useCallback, useState } from 'react';
import Card from '../Card';
import Content from '../Content';
import Wrapper from '../UI/Border';
import Confirm from '../UI/Confirm';
import Skelon from '../Skelon';
import './index.css';

const Item = (props) => {
    // console.log("Item1:", props);
    const [confirmShow, setConfirmShow] = useState(false);
    const show = () => {
        setConfirmShow(true);
    }
    const hidden = useCallback(() => {
        setConfirmShow(false);
    }, [setConfirmShow]);
    const test = () => {
        console.log("test");
    }
    return (
        <Wrapper className='Item'>
            {confirmShow && <Confirm content={"注意！确认删除该条信息吗？"} onConfirm={props.del} onCancel={hidden} test={test}/>}
            <Card date={props.date}/>
            <Content id={props.id} context={props.context} min={props.min} show={show}/>
        </Wrapper>
    )
}

export default Item;