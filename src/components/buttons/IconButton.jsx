import React from 'react';
import Axios from 'axios';

const IconButton = ({ app }) => {
    const { img, href, alt, color, txt, name } = app;

    return (
        <a 
            href={`${process.env.REACT_APP_API_URI}/${href}`}
            style={{ backgroundColor: color, margin: 5, display: 'block' }}
            title={txt}
        >
            <img src={img} alt={alt} />
            <span>{name.toUpperCase()} Login</span>
        </a>
    );
};

export default IconButton;