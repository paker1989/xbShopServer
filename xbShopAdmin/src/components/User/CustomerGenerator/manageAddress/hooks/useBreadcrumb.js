import { useMemo } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { addAddressGenerator as addressMeta } from '../../../../../static/data/componentMeta/user/addCustomerMeta';
import { getUrlParameter } from '../../../../../utils/url.helper';

const { routes } = addressMeta;

const useBreadCrumb = () => {
    const location = useLocation();
    const { url: routerUrl } = useRouteMatch();

    const breadcrumbs = useMemo(() => {
        // debugger;
        const paths = [];
        const subPath = location.pathname.replace(routerUrl, '');
        const isEdit = location.search.includes('addressId');

        if (subPath === routes.add) {
            const customerId = getUrlParameter('customerId') || -1;
            paths.push({
                label: 'basic',
                path: `${routerUrl}${routes.basic}?customerId=${customerId}`,
            });
            paths.push({
                label: isEdit ? 'editAddress' : 'addAddress',
            });
        } else {
            paths.push({
                label: 'basic',
            });
        }
        return paths;
    }, [location.pathname, location.search]);
    return breadcrumbs;
};

export default useBreadCrumb;
