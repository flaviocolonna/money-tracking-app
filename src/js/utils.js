import { OpType } from './models/enums';

function findIndex(list, cb) {
    for (let i = 0; i < list.length; i++) {
        if (cb(list[i])) {
            return i;
        }
    }
    return -1;
}

const isValidOperation = (op) =>
    op?.description &&
    parseFloat(op?.amount) > 0 &&
    typeof OpType[op?.type] !== 'undefined';

function getWallet() {
    const wallet = localStorage.getItem('wallet');
    if (!wallet) {
        return {
            balance: 0,
            operations: [],
        };
    }
    return JSON.parse(wallet);
}

export { getWallet, isValidOperation, findIndex };
