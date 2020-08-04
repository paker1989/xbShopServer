
const getFormattedDate = (date) => {
    const month = date.getUTCMonth() + 1; // months from 1-12
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return { year, month, day };
};

const normalizeGalleryPath = (basePath, galleryName) => {
    const { year, month, day } = getFormattedDate(new Date());
    return `${basePath}/upload/img/${year}/${month}/${day}/${galleryName}`;
};

module.exports = {
    getFormattedDate,
    normalizeGalleryPath,
};
