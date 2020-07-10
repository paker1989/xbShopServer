import * as MetaActionType from '../actionType/metaActionType';

export const changeLocale = (locale) => ({
    type: MetaActionType._CHANGE_LOCALE,
    payload: { globalLocale: locale },
});
