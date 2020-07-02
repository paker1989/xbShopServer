import React from 'react';
import { Skeleton } from 'antd';

import './containerSkeleton.scss';

const ContainerSkeleton = () => {
    return (
        <div className="container-skeleton">
            <div className="skeleton-header section-container">
                <Skeleton active />
            </div>
            <div className="skeleton-body section-container">
                <Skeleton active />
            </div>
        </div>
    );
};

export default ContainerSkeleton;
