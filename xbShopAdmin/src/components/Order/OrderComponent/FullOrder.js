import React, { memo } from 'react';
import { Tag, Typography, List, Avatar } from 'antd';
import { FormattedMessage } from 'react-intl';

import { _ORDER_SUPPORTED_ADDI_TYPE, getOrderStatus, getCurrencySymbol } from '../../../utils/component/order.helper';
import { getPriceFormatter } from '../../../utils/data.helper';
import order from '../../../translations/fr/order';

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
    const { val: statusVal, color: statusColor } = orderStatus;

    return (
        <div className="full-order-header flex-row-container middle">
            {additional.length > 0 && (
                <span className="header-meta-section">
                    <Tag color={_ORDER_SUPPORTED_ADDI_TYPE[additional].color}>
                        {/* {additional} */}
                        <FormattedMessage id={`order.addiSts.${_ORDER_SUPPORTED_ADDI_TYPE[additional].val}`} />
                    </Tag>
                </span>
            )}
            <Text className="header-meta-section">
                <span style={{ color: statusColor }}>
                    <FormattedMessage id={`order.status.${statusVal}`} />
                </span>
            </Text>
            <div className="header-meta-section">
                <FormattedMessage
                    id="order.label.createAt"
                    values={{ b: (chunk) => <Text strong>{chunk}</Text>, date: createAt }}
                />
            </div>
            {payAt.length > 0 && (
                <div className="header-meta-section">
                    <FormattedMessage
                        id="order.label.payAt"
                        values={{ b: (chunk) => <Text strong>{chunk}</Text>, date: payAt }}
                    />
                </div>
            )}
            <span className="header-meta-section">
                <FormattedMessage
                    id="order.label.totalProduct"
                    values={{ b: (chunk) => <Text strong>{chunk}</Text>, nb: totalCnt }}
                />
            </span>
            <div className="header-meta-section">
                <FormattedMessage
                    id="order.label.totalPrice"
                    values={{
                        b: (chunk) => <Text strong>{chunk}</Text>,
                        price: `${getCurrencySymbol(currency)}${getPriceFormatter(sum)}`,
                        p: (chunk) => <span className="price">{chunk}</span>,
                    }}
                />
            </div>
        </div>
    );
};

const ProductList = ({ products }) => {
    return (
        <div className="order-product-list-container">
            <List
                className="order-product-list"
                itemLayout="horizontal"
                dataSource={products}
                renderItem={(item) => (
                    <List.Item key={item.sku}>
                        <List.Item.Meta avatar={<Avatar shape="square" src={item.thumbnail} />} />
                        <div className="order-product-content flex-row-container middle between">
                            <Text>{item.title}</Text>
                            <span>
                                <FormattedMessage
                                    id="common.number.count"
                                    values={{
                                        p: (chunk) => <Text strong>{chunk}</Text>,
                                        nb: item.cnt,
                                        b: (chunk) => <span className="price">{chunk}</span>,
                                    }}
                                />
                            </span>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};
const BodyMeta = ({ orderContent }) => {
    return (
        <div className="full-order-body">
            <ProductList products={orderContent.products} />
        </div>
    );
};

const FullSingleColumn = {
    dataIndex: 'id',
    key: 'orderId',
    render: (text, record) => {
        return (
            <div className="full-order-container flex-row-container column">
                <HeaderMeta orderMeta={record} />
                <BodyMeta orderContent={record} />
            </div>
        );
    },
};

export default {
    columns: [FullSingleColumn],
};
