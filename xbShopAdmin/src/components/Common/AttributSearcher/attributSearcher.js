import React from 'react';
import { Input, Button, Typography } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import './attributSearcher.scss';

const { Text } = Typography;

const AttributSearcher = ({
    intl,
    searchPairs = [{ inputVal: '', labelText: 'common.search.item', placeholder: 'common.typing', onChange: () => {} }],
    btnText = 'common.search',
    onSubmit,
}) => {
    return (
        <div className="attribut-searcher flex-row-container middle">
            <div className="flex-row-container middle">
                {searchPairs.map((pair) => (
                    <span key={pair.labelText} className="attribut-pairs flex-row-container middle">
                        {pair.labelText && (
                            <Text className="no-shrink label">
                                <FormattedMessage id={pair.labelText} />
                            </Text>
                        )}
                        <Input
                            value={pair.inputVal}
                            placeholder={intl.formatMessage({ id: pair.placeholder })}
                            onChange={pair.onChange}
                        />
                    </span>
                ))}
            </div>
            <Button type="primary" onClick={onSubmit}>
                {intl.formatMessage({ id: btnText })}
            </Button>
        </div>
    );
};

export default injectIntl(AttributSearcher);
