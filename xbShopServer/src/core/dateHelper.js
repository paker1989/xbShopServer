const { HttpException } = require('./httpException');

const getFormattedDate = (date) => {
    const month = date.getUTCMonth() + 1; // months from 1-12
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return { year, month, day };
};

const normalizeImgPath = (basePath, prefix, galleryName) => {
    const { year, month, day } = getFormattedDate(new Date());
    return `${basePath}/upload/${prefix}/${year}/${month}/${day}/${galleryName}`;
};

// gender^m&isActive^true-false
const getFilters = (filterStr) => {
    if (filterStr === 'NA') {
        return {};
    }
    try {
        const filterObj = {};
        const filterArray = filterStr.split('&');
        filterArray.forEach((entry) => {
            const entryArr = entry.split('^');
            filterObj[entryArr[0]] = entryArr[1].split('-');
        });
        return filterObj;
    } catch (err) {
        throw new HttpException('filter is invalid');
    }
};

module.exports = {
    getFormattedDate,
    normalizeImgPath,
    getFilters,
};
