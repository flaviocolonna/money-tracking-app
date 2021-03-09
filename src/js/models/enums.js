/**
 * @typedef {string} SnackbarTypeInterface
 * @property {string} SUCCESS - Show green snackbar
 * @property {string} ERROR - Show red snackbar
 */
/**
 * @typedef {string} OperationTypeInterface
 * @property {string} OUT - Expense identifier
 * @property {string} IN - Income identifier
 */
/**
 * @typedef {string} WalletErrorsInterface
 * @property {string} INVALID_OPERATION - Operation description, amount or type is invalid
 * @property {string} OPERATION_NOT_FOUND - Operation not found in the wallet
 */

/**
 * @readonly
 * @enum {OperationTypeInterface}
 */
const OpType = Object.freeze({
    OUT: 'OUT',
    IN: 'IN',
});
/**
 * @readonly
 * @enum {WalletErrorsInterface}
 */
const WalletErrors = Object.freeze({
    INVALID_OPERATION: 'INVALID_OPERATION',
    OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND',
});
/**
 * @readonly
 * @enum {SnackbarTypeInterface}
 */
const SnackbarTypes = Object.freeze({
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
});
const WalletSubjects = Object.freeze({
    WALLET_SAVED: 'WALLET_SAVED',
});
export { OpType, WalletErrors, SnackbarTypes, WalletSubjects };
