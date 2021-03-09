/**
 * @typedef {string} SnackbarType
 * @property {string} SUCCESS - Show green snackbar
 * @property {string} ERROR - Show red snackbar
 */
/**
 * @typedef {string} OperationType
 * @property {string} OUT - Expense identifier
 * @property {string} IN - Income identifier
 */
/**
 * @typedef {string} WalletErrors
 * @property {string} INVALID_OPERATION - Operation description, amount or type is invalid
 * @property {string} OPERATION_NOT_FOUND - Operation not found in the wallet
 */

/**
 * @readonly
 * @enum {OperationType}
 */
const OpType = Object.freeze({
    OUT: 'OUT',
    IN: 'IN',
});
/**
 * @readonly
 * @enum {WalletErrors}
 */
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
