import React from 'react';
import { Input, Button } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

const AttributSearcher = ({
    intl,
    searchPairs = [{ labelText: 'common.search.item', placeholder: 'common.typing', onChange: () => {} }],
    btnText = 'common.search',
    onSubmit,
}) => {
    return (
        <div className="flex-row-container middle">
            <div className="attribut-pairs">
                {searchPairs.map((pair) => (
                    <span key={pair.labelText} className="flex-row-container middle">
                        <span>
                            <FormattedMessage id={pair.labelText} />
                        </span>
                        <Input placeholder={intl.formatMessage({ id: pair.placeholder })} onChange={pair.onChange} />
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
