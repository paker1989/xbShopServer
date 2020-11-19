import React from 'react';
import { Icon } from 'antd';

const CustomIcon = ({ name, ...nativeProps }) => {
    /* eslint-disable */
    // const svg = require(`../../../static/image/icon/${name}.svg`);
    /* eslint-enable */
    // console.log(svg);
    const component = () => <img alt={name} src={`/static/image/icon/${name}.svg`} />;
    return <Icon component={component} {...nativeProps} />;
};

export default CustomIcon;
