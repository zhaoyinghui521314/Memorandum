import './index.css';


const Content = (props) => {
    // console.log("del", props.del);
    return (
        <div className="Content">
            <div className="context">{props.context}</div>
            <span className="min">{props.min}</span>
            <span className="btn" onClick={() => props.show(props.id)}>+</span>
        </div>
    )
}

export default Content;