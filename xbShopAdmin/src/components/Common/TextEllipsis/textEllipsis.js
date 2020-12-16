import React from 'react';
import { Tooltip } from 'antd';

const TextEllipsis = ({ limit = 50, text = '' }) => {
    if (text.length === 0) {
        return null;
    }

    if (text.length <= limit) {
        return text;
    }

    return (
        <Tooltip title={text} placement="bottom">
            {`${text.slice(0, limit)}...`}
        </Tooltip>
    );
};

// if (TextEllipsis.prototype && TextEllipsis.prototype.isPureReactComponent)

export default TextEllipsis;
