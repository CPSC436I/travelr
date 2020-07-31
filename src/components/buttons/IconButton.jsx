import React from 'react';
import Axios from 'axios';

const IconButton = ({ app }) => {
    const { img, href, alt, color, txt, name } = app;

    return (
        <a 
            href={`${process.env.REACT_APP_API_URI}/${href}`}
        >
            <img src={img} alt={alt} />
        </a>
    );
};

export default IconButton;