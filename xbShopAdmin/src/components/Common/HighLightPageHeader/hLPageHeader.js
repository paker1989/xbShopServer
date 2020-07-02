import React from 'react';
import PropTypes from 'prop-types';

import { PageHeader } from 'antd';

import './hLPageHeader.scss';

const HighLightPageHeader = (props) => {
    const { description, ...antProps } = props;

    const Content = <div className="content-wrapper">{description}</div>;
    return (
        <div className="hl-page-header section-container">
            <PageHeader {...antProps}>{Content}</PageHeader>
        </div>
    );
};

HighLightPageHeader.propTypes = {
    breadCrumb: PropTypes.node,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default HighLightPageHeader;
