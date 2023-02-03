import Wrapper from '../UI/Border';
import showImage from '../../Source/bizhi.jpg';
import './index.css';

const Show = (props) => {
    return (
        <Wrapper className='show'>
            {props.children ? props.children : <img src={showImage} alt="showImage" />}
        </Wrapper>
    )
}

export default Show;