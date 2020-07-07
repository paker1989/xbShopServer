import React from 'react';
import { IntlProvider } from 'react-intl';

import zhCN from '../../translations/zh';
import frFR from '../../translations/fr';

const messages = { zh: zhCN, fr: frFR };

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
