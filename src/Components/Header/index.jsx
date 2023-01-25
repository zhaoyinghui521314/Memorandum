import { set } from 'lodash';
import { useState } from 'react';
import './index.css';

const Header = (props) => {
    const [line, setLine] = useState(0);
    const name = ['早上', '中午', '晚上'];
    const { map } = props;
    const scrollTo = (id) => {
        const node = map.get(id);
        console.log("node:", node);
        node.scrollIntoView({
            behavior: 'smooth'
        })
    }
    const toggleHandle = (index) => {
        return () => {
            setLine(index);
            // 跳转到对应的scroll
            scrollTo(index*3);
        }
    }
    const nameItem = name.map((_, index) => {
        return (
                <li key={index} onClick={toggleHandle(index)} className='li'>
                    {name[index]}
                    <span key={index} className={`line ${line == index && 'lineShow'}`}></span>
                </li>
        )
    })
    return (
        <ul className="list">
            {nameItem}
        </ul>
    )
}

export default Header;