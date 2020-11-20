import { useMemo } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { addAddressGenerator as addressMeta } from '../../../../../static/data/componentMeta/user/addCustomerMeta';

const { routes } = addressMeta;

const useBreadCrumb = () => {
    const location = useLocation();
    const { url: routerUrl } = useRouteMatch();

    const breadcrumbs = useMemo(() => {
        const paths = [];
        const subPath = location.pathname.replace(routerUrl, '');
        const isEdit = location.search.includes('addressId');

        if (subPath === routes.add) {
            paths.push({
                label: 'basic',
                path: `${routerUrl}${routes.basic}`,
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
