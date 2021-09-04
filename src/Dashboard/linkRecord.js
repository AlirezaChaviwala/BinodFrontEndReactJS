import React,{useRef} from 'react'
import '../Dashboard/linkRecord.css';
import { Link } from 'react-router-dom';

const LinkRecord = ({record}) => {
    let inputRef=useRef(null);
    return (
        <div className='link-record-wrapper'>
            <div className='short-url-div'><h3>{record.shortUrl}</h3></div>
            <div className='record-details-wrapper'>
                <h4>{record.longUrl}</h4>
                <div className='copy-count'>
                    <input ref={inputRef} defaultValue={`netlify/${record.shortUrl}`}/>
                    <button onClick={()=>{
                        inputRef.current.select();
                        document.execCommand('Copy');
                    }}>Copy</button>
                    <p>Count: {record.count}</p>
                </div>
            </div>
        </div>
    )
}

export default LinkRecord
