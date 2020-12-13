import React from 'react';
import { Tag } from 'antd';

import './tableFilter.scss';

const presetColor = ['magenta', 'geekblue', 'volcano', 'green'];

const TableFilter = ({ filters = [], onChange }) => {
    if (!filters || filters.length === 0) {
        return null;
    }

    return (
        <div className="xb-filter flex-row-container wrap">
            <span className="preset">已选择: </span>
            {filters.map((filter, index) => {
                const { label, value, type } = filter;
                const tagColor = presetColor[index % presetColor.length];
                return (
                    <Tag color={tagColor} key={value} closable onClose={() => onChange({ type, value })}>
                        {label}
                    </Tag>
                );
            })}
        </div>
    );
};

export default TableFilter;
