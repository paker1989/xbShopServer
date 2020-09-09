import config from '../../static/data/componentMeta/auth/authMeta';

const useUserOptions = (user = { preference: [] }) => {
    const { userMenuItems } = config;
    const { preference = [] } = user;

    const toDisplay = Object.keys(userMenuItems).filter((itemKey) => {
        const requiredPvlgs = userMenuItems[itemKey].privileges || [];
        if (requiredPvlgs.length === 0) {
            return true;
        }
        return (
            requiredPvlgs.filter((p) => {
                return preference.indexOf(p) > -1;
            }).length > 0
        );
    });

    return [toDisplay];
};

export default useUserOptions;
