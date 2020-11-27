import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import AddressCard from './addressCard';
import useAddresses from './hooks/useAddresses';

import './address.scss';

const AddressList = ({ customerId }) => {
    const addressList = useAddresses(customerId);
    const reactHistory = useHistory();
    const location = useLocation();
    // console.log(addressList);
    const addAddress = () => {
        reactHistory.push({
            pathname: `${location.pathname}/add`,
            search: `?customerId=${customerId}`,
        });
    };

    return (
        <div className="address-list">
            <AddressCard.ADD key="add-card" onAdd={addAddress} />
            {addressList.map((item) => {
                return <AddressCard address={item} key={item.idAddress} />;
            })}
        </div>
    );
};

export default AddressList;
// export default AddressList;
