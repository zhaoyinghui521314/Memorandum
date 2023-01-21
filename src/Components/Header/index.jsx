import { set } from 'lodash';
import { useState } from 'react';
import './index.css';

const Header = () => {
    const [line, setLine] = useState(0);
    const name = ['早上', '中午', '晚上'];
    const toggleHandle = (index) => {
        return () => {
            setLine(index);
        }
    }
    const nameItem = name.map((_, index) => {
        return (
                <li onClick={toggleHandle(index)} className='li'>
                    {name[index]}
                    <span className={`line ${line == index && 'lineShow'}`}></span>
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