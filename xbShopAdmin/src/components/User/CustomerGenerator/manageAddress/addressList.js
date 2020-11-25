import React from 'react';

import AddressCard from './addressCard';
import useAddresses from './hooks/useAddresses';

import './address.scss';

const AddressList = ({ customerId }) => {
    const addressList = useAddresses(customerId);
     
    console.log(addressList);
    return (
        <div className="address-list">
            <AddressCard.ADD key="add-card" />
            {addressList.map((item) => {
                return <AddressCard address={item} key={item.idAddress} />;
            })}
        </div>
    );
};

// export default injectIntl(withRouter(AddressList));
export default AddressList;
