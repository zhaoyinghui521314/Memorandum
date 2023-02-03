import './index.css';

const Loading = () => {
    return (
        <div className="container">
			<div className="sun">
				<div className="sun-body">
					<div className="line" style={{"--i" : 1}}></div>
					<div className="line" style={{"--i" : 2}}></div>
					<div className="line" style={{"--i" : 3}}></div>
					<div className="line" style={{"--i" : 4}}></div>
					<div className="line" style={{"--i" : 5}}></div>
					<div className="line" style={{"--i" : 6}}></div>
					<div className="line" style={{"--i" : 7}}></div>
					<div className="line" style={{"--i" : 8}}></div>
				</div>
				<div className="eye"></div>
			</div>
			<div className="horizon"></div>
		</div>
    )
}

export default Loading;