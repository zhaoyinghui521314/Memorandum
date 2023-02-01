import Wrapper from '../UI/Border';
import showImage from '../../Source/bizhi.jpg';
import './index.css';

const Show = (props) => {
    return (
        <Wrapper className='show'>
            {props.context ? props.context() : <img src={showImage} alt="showImage" />}
        </Wrapper>
    )
}

export default Show;