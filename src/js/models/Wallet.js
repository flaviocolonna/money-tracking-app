import {
    getWallet,
    isValidOperation,
    doCreateOperation,
    doRemoveOperation,
} from '../utils';
import { WalletErrors, WalletSubjects } from './enums';
import EventManager from './EventManager';
/**
 * @typedef {object} Operation
 * @property {number} id
 * @property {number} date
 * @property {number} amount
 * @property {string} description
 * @property {OperationTypeInterface} type
 */
/**
 * @typedef {Object} WalletInterface
 * @property {number} balance
 * @property {Array<Operation>} operations
 */

/**
 * Wallet namespace
 * @constructor
 * @class
 * @extends EventManager
 */
class Wallet extends EventManager {
    #balance = 0;
    #operations = [];

    constructor() {
        super();
    }
    /**
     * Update the wallet by getting its saved version.
     * @name updateWallet
     * @function
     * @private
     * @instance
     * @void
     */
    async updateWallet() {
        const { balance, operations } = await getWallet();
        // eslint-disable-next-line no-invalid-this
        this.#balance = balance;
        // eslint-disable-next-line no-invalid-this
        this.#operations = operations;
        this.trigger(WalletSubjects.WALLET_SAVED);
    }

    /**
     * Add the operation to the wallet and save it
     * @name addOperation
     * @memberof Wallet
     * @function
     * @instance
     * @param {Operation} op - Operation to add
     * @return {Promise} Promise network call
     * @throws {Error} INVALID_OPERATION
     */
    async addOperation(op) {
        if (!isValidOperation(op)) {
            throw new Error(WalletErrors.INVALID_OPERATION);
        }
        const { description, type, amount } = op;
        const operationToAdd = {
            amount: parseFloat(amount),
            description: description.trim(),
            type,
        };
        await doCreateOperation(operationToAdd);
        await this.updateWallet();
    }
    /**
     * Remove the operation found with the id passed from the wallet and save it
     * @name removeOperation
     * @memberof Wallet
     * @void
     * @function
     * @instance
     * @throws {Error} OPERATION_NOT_FOUND
     * @param {number} opId - Operation's id to remove
     * @return {Promise}
     */
    async removeOperation(opId) {
        const operationIndex = this.#operations.findIndex(
            ({ id }) => id === opId
        );
        if (operationIndex === -1) {
            throw new Error(WalletErrors.OPERATION_NOT_FOUND);
        }
        await doRemoveOperation(opId);
        await this.updateWallet();
    }
    /**
     * Find the list of the operations that match partial description with the search value.
     * @name findOperation
     * @memberof Wallet
     * @function
     * @instance
     * @param {string} searchValue - Term to search
     * @return {Array<Operation>}
     */
    findOperation(searchValue) {
        const val = searchValue?.toLowerCase().trim();
        if (!val) {
            return this.#operations;
        }
        return this.#operations.filter(({ description }) =>
            description.toLowerCase().includes(val)
        );
    }
    /**
     * It returns the balance of the wallet.
     * @name getBalance
     * @memberof Wallet
     * @function
     * @instance
     * @return {boolean}
     */
    getBalance() {
        return this.#balance;
    }
    /**
     * It returns the list of the operations.
     * @name getOperations
     * @memberof Wallet
     * @function
     * @instance
     * @return {Array<Operation>}
     */
    getOperations() {
        return this.#operations;
    }
}

export default new Wallet();
