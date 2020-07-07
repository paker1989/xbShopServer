import React from 'react';
import { IntlProvider } from 'react-intl';

import zh_CN from '../../translations/zh';
// import en_US from '../../../lib/i18n/en-US';
import fr_FR from '../../translations/fr';

const messages = { zh: zh_CN, fr: fr_FR };

export const locales = [
    { label: '中文', code: 'zh' },
    { label: 'FR', code: 'fr' },
    { label: 'EN', code: 'en' },
];

const I18nProvider = ({ children, locale }) => {
    return (
        <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
            {children}
        </IntlProvider>
    );
};

export default I18nProvider;
