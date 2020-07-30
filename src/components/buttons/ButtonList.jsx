import React from 'react';
import IconButton from './IconButton';

import { data } from '../../data';

const ButtonList = () => {
    return data.map(app => {
        return (
            <IconButton app={app} key={app.name}/>
        )
    });
};

export default ButtonList;