/**
 * @typedef {string} SnackbarType
 * @property {string} SUCCESS - Show green snackbar
 * @property {string} ERROR - Show red snackbar
 */

const OpType = Object.freeze({
    OUT: 'OUT',
    IN: 'IN',
});
const WalletErrors = Object.freeze({
    INVALID_OPERATION: 'INVALID_OPERATION',
    OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND',
});
/**
 * @readonly
 * @enum {SnackbarType}
 */
const SnackbarTypes = Object.freeze({
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
});
const WalletSubjects = Object.freeze({
    WALLET_SAVED: 'WALLET_SAVED',
});
export { OpType, WalletErrors, SnackbarTypes, WalletSubjects };
