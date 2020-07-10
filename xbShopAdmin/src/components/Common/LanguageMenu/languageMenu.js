/**
 * 首页header的语言切换
 */
import React from 'react';

import { language } from '../../../static/data/componentMeta/global.meta';
import { Dropdown, Menu } from 'antd';
import langIcon from '../../../static/image/icon/language.svg';

import './languageMenu.scss';

/**
 * @param {*} lang current language
 * @param {*} onChange: onChange event handler
 */
const LanguageMenu = ({ onChange, lang }) => {
    const menu = (
        <Menu onClick={onChange} selectedKeys={[lang]}>
            {language.map((item) => (
                <Menu.Item key={item.code}>
                    <div className="flex-row-container middle">
                        <span style={{ marginRight: 10 }}>{item.code}</span>
                        <span style={{ marginRight: 10 }}>{item.label}</span>
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <img src={langIcon} className="xb-menu-icon clickable" />
        </Dropdown>
    );
};

export default LanguageMenu;
