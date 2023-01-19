import React from 'react';
import './index.css';

const Wrapper = React.forwardRef((props, ref) => {
    // console.log("name", props.className);
    console.log("formRef2", ref);
    return (
        <div ref={ref} className={`Wrapper ${props.className}`} onClick={props.onClick}>
            {props.children}
        </div>
    )
})

export default Wrapper;