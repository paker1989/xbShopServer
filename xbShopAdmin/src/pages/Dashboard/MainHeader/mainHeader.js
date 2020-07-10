import React from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import LanguageMenu from '../../../components/Common/LanguageMenu/languageMenu';
import NotificationMenu from '../../../components/Common/Notification/notification';

import * as MetaActionCreator from '../../../store/action/metaActions';

import './main-header.scss';

const { Header } = Layout;

const MainHeader = () => {
    const dispatch = useDispatch();
    const locale = useSelector((state) => state.meta.languageReducers.globalLocale);
    const handleLocal = ({ key }) => {
        console.log(key);
        dispatch(MetaActionCreator.changeLocale(key));
    };

    return (
        <Header className="main-header">
            <div className="menu-container flex-row-container middle end">
                <NotificationMenu count={20} />
                <LanguageMenu onChange={handleLocal} lang={locale} />
            </div>
        </Header>
    );
};

MainHeader.propTypes = {};

export default MainHeader;
