import React from 'react'
import '../errorPage/errorPage.css';

const ErrorPage = () => {
    let error={message:'Page expired'}
    return (
        <div className='error-page-wrapper'>
            <h1>Oops..</h1>
            <h2>{error.message}</h2>
        </div>
    )
}

export default ErrorPage;
