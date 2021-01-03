import React from 'react';

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

const FullSingleColumn = {
    dataIndex: 'id',
    key: 'orderId',
    render: (text, record) => {
        return <div>full single column</div>;
    },
};

export default {
    columns: [FullSingleColumn],
};
