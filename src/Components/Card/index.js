import Wrapper from '../UI/Border';
import './index.css';

const Card = (props) => {
    const { date } = props;
    // console.log("Card date:", date);
    const [_, month, day] = date.split("-");
    // console.log("Card:", date, month, day);
    // const month = props.date.getMonth();
    // const day = props.date.getDate();
    return (
        <Wrapper className="Card">
            <div className="month">{month}</div>
            <div className="day">{day}</div>
        </Wrapper>
    )
}

export default Card;