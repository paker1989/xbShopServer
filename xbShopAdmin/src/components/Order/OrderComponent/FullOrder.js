import React, { memo } from 'react';
import { Tag, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { _ORDER_SUPPORTED_ADDI_TYPE, getOrderStatus, getCurrencySymbol } from '../../../utils/component/order.helper';
import { getPriceFormatter } from '../../../utils/data.helper';

// const BodyRow = (props) => {
//     console.log('full order header row');
//     console.log(props);
//     const { children, ...otherProps } = props;
//     // return <tr {...otherProps}></tr>;
//     return <tr {...props} />;
// };

// const HeaderRow = ({ ...props }) => {
//     console.log('full order header row');
//     console.log(props);
//     return (
//         <tr {...props}>
//             <td>full order header row</td>
//         </tr>
//     );
// };

const { Text } = Typography;

const HeaderMeta = ({ orderMeta }) => {
    const {
        additional = '',
        sts,
        createAt,
        payAt = '',
        total_cnt: totalCnt,
        sum_price: sum,
        currency = 'yuan',
    } = orderMeta;

    const orderStatus = getOrderStatus(sts);
    const { val: statusVal } = orderStatus;

    // console.log(_ORDER_SUPPORTED_ADDI_TYPE[additional]);

    return (
        <div className="full-order-header flex-row-container middle">
            {additional.length > 0 && (
                <span className="header-meta-section">
                    <Tag color={_ORDER_SUPPORTED_ADDI_TYPE[additional].color}>{additional}</Tag>
                </span>
            )}
            <Text className="header-meta-section">
                <FormattedMessage id={`order.status.${statusVal}`} />
            </Text>
            <div className="header-meta-section">
                <Text strong>Commandé à: </Text>
                <Text>{createAt}</Text>
            </div>
            {payAt.length > 0 && (
                <div className="header-meta-section">
                    <Text strong>Payé à: </Text>
                    <Text>{payAt}</Text>
                </div>
            )}
            <span className="header-meta-section">
                En total de
                <Text strong>3</Text>
                produits
            </span>
            <div className="header-meta-section">
                <Text strong>Prix total: </Text>
                <span className="price">{`${getCurrencySymbol(currency)}${getPriceFormatter(sum)}`}</span>
            </div>
        </div>
    );
};

const FullSingleColumn = {
    dataIndex: 'id',
    key: 'orderId',
    render: (text, record) => {
        return (
            <div className="full-order-container">
                <HeaderMeta orderMeta={record} />
            </div>
        );
    },
};

export default {
    columns: [FullSingleColumn],
};
