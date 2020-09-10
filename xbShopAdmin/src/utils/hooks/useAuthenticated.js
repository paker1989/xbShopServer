import cookie from 'react-cookies';

import config from '../../static/data/componentMeta/auth/authMeta';

const useAuthenticated = () => {
    const { authedKey } = config;

    const authUser = cookie.load(authedKey);
    const authFlag = authUser !== undefined && authUser !== null;
    return [authUser, authFlag];
};

export default useAuthenticated;
