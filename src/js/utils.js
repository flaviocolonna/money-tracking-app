import { OpType } from "./models/enums";

function findIndex(list, cb) {
    for (let i = 0; i < list.length; i++) {
        if (cb(list[i])) {
            return i;
        }
    }
    return -1;
}
function isValidOperation(op) {
    if(!op) {
        return false;
    }
    const { description, type, amount } = op;
    return description && parseFloat(amount) > 0 && typeof OpType[type] !== 'undefined';
}
function getWallet() {
    const wallet = localStorage.getItem('wallet');
    if (!wallet) {
        return {
            balance: 0,
            operations: []
        }
    }
    return JSON.parse(wallet);
}

export {
    getWallet,
    isValidOperation,
    findIndex
}