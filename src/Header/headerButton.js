import React from 'react'
import './headerButton.css'

const HeaderButton = ({innerText,handleClick,className}) => {
    return (<>
        {
            <button className={className} onClick={handleClick}>{innerText}</button>
        }
        </>
    )
}

export default HeaderButton;
