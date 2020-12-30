const _ORDER_STATUS = {
    1: { val: 'completed', color: '#51994F' },
    2: { val: 'toDeliver', color: '#C74E55' },
    3: { val: 'toReceive', color: '#4767DC' },
    4: { val: 'toPay', color: '#73840A' },
    5: { val: 'canceled', color: '#323232' },
};

const _CURRENCY_CONVERTER = {
    euro: '€',
    yuan: '¥',
};

export function getOrderStatus(statusId) {
    return _ORDER_STATUS[statusId];
}

export function getCurrencySymbol(currency) {
    return _CURRENCY_CONVERTER[currency];
}
