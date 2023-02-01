import './index.css';

const Lantern = () => {
    return (
        <div className="lantern" style={{"--name": "red"}}>
            <div className="top"></div>
            <div  className="content">
                <span style={{ '--i': 0 }}></span>
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
            </div>
        </div>
    )
}

export default Lantern;