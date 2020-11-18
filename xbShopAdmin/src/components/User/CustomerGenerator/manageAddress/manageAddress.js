import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { Form, Input, Radio, Row, Col, Button, message, Switch } from 'antd';
// import { injectIntl, FormattedMessage } from 'react-intl';

// import { withRouter } from 'react-router-dom';
// import PasswordConfirmer from '../../../Common/PasswordConfirmer/pwdConfirmer';
// import ThumbnailUpload from '../../../Common/ThumbnailUpload/thumbnailUpload';
import { useUnmount } from 'ahooks';
// import { customerGenerator as addCustomerMeta } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import * as CustomerActionType from '../../../../store/actionType/customerActionType';
import * as CustomerActionCreator from '../../../../store/action/customerAction';
// import * as ServerErrorType from '../../../../static/data/serverErrorType/customerType';
// import getValidators from './validators';

import AddressCard from './addressCard';
import AddAddressForm from './addAddressForm';

// import './addCustomerForm.scss';

const ManageAddress = () => {
    const dispatch = useDispatch();
    const editMode = useSelector((state) => state.user.addAddress.editMode);

    useUnmount(() => {
        dispatch(CustomerActionCreator.resetAddressState());
    });

    if (editMode) {
        return <AddAddressForm />;
    }

    return <AddressCard.ADD />;
};

export default ManageAddress;
