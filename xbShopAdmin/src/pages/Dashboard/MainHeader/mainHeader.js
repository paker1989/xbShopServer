import React from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import UserMenu from './UserCenterMenu/userCenterMenu';
import LanguageMenu from '../../../components/Common/LanguageMenu/languageMenu';
import NotificationMenu from '../../../components/Common/Notification/notification';

import useAuthenticated from '../../../utils/hooks/useAuthenticated';
import * as MetaActionCreator from '../../../store/action/metaActions';

import './main-header.scss';

const { Header } = Layout;

const MainHeader = () => {
    const dispatch = useDispatch();
    const [authUser, authFlag] = useAuthenticated();
    const locale = useSelector((state) => state.meta.languageReducers.globalLocale);
    const handleLocal = ({ key }) => {
        dispatch(MetaActionCreator.changeLocale(key));
    };

    return (
        <Header className="main-header">
            <div className="menu-container flex-row-container middle end">
                <UserMenu user={authUser} />
                <NotificationMenu count={20} />
                <LanguageMenu onChange={handleLocal} lang={locale} />
            </div>
        </Header>
    );
};

MainHeader.propTypes = {};

export default MainHeader;
