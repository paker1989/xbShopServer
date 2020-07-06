/**
 * this util contains some factory method to produce some data model with default fields
 */

/**
 * 添加规格的时候
 * @param {*} specSize
 */
export function getDefaultSpec(specSize) {
    return {
        tmpId: specSize + 1,
        sku: '',
        specType: '',
        price: 0,
        stockNumber: 0,
    };
}
