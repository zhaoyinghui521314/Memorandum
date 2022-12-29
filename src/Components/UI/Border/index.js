import './index.css';

const Wrapper = (props) => {
    // console.log("name", props.className);
    return (
        <div className={`Wrapper ${props.className}`} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

export default Wrapper;