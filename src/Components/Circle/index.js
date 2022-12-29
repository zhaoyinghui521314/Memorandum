import styled from "styled-components";

const CircleProgress = styled.div`
    position: absolute;
    top: -35px;
    left: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradient(deeppink ${(props) => props.deg / 100 * 360}deg, yellow 0);
    ::before {
        content: '';
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color:  rgba(255,0,0);
    }
`

const LabelProgress = styled.span`
    z-index: 1;

`

const Circle = (props) => {
    return (
        <CircleProgress deg={props.deg}>
            <LabelProgress>{props.deg}</LabelProgress>
        </CircleProgress>
    )
}

export default Circle;