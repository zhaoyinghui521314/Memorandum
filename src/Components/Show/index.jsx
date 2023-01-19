import Wrapper from '../UI/Border';
import showImage from '../../Source/bizhi.jpg';
import './index.css';

const Show = () => {
    return (
        <Wrapper className='show'>
            <img src={showImage} alt="showImage" />
        </Wrapper>
    )
}

export default Show;