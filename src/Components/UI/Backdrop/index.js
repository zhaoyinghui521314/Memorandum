import './index.css';


const Backdrop = (props) => {
    return  (
        <div className="backdrop" {...props}>
            {props.children}
        </div>
    )
}

export default Backdrop;