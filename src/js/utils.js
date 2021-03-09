import { OpType } from './models/enums';

/**
 * Check if an operation is valid based on amount, description and type.
 * @name isValidOperation
 * @function
 * @param {Operation} op - Operation to check
 * @return {boolean}
 */
const isValidOperation = (op) =>
    op?.description &&
    parseFloat(op?.amount) > 0 &&
    typeof OpType[op?.type] !== 'undefined';

/**
 * Get the saved wallet.
 * @name getWallet
 * @function
 * @return {WalletInterface}
 */
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

export { getWallet, isValidOperation };
