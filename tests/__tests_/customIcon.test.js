import React from 'react';
import renderer from 'react-test-renderer';

import CustomIcon from '../../xbShopAdmin/src/components/Common/CustomIcon/customIcon';

it('should match customIcon snapshot', () => {
    const component = renderer.create(<CustomIcon />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
