import { getWallet, isValidOperation } from '../utils';
import { WalletErrors, OpType, WalletSubjects } from './enums';
import EventManager from './EventManager';
/**
 * @typedef {object} Operation
 * @property {number} id
 * @property {number} date
 * @property {number} amount
 * @property {string} description
 * @property {string} type
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
        this.#init();
    }

    /**
     * Initialize the wallet by getting its saved version.
     * @name init
     * @function
     * @private
     * @instance
     * @void
     */
    #init() {
        const { balance, operations } = getWallet();
        // eslint-disable-next-line no-invalid-this
        this.#balance = balance;
        // eslint-disable-next-line no-invalid-this
        this.#operations = operations;
    }

    /**
     * Save the wallet in the local storage
     * @name saveWallet
     * @memberof Wallet
     * @instance
     * @function
     * @void
     */
    saveWallet() {
        localStorage.setItem(
            'wallet',
            JSON.stringify({
                balance: this.#balance,
                operations: this.#operations,
            })
        );
        this.trigger(WalletSubjects.WALLET_SAVED);
    }

    /**
     * Add the operation to the wallet and save it
     * @name addOperation
     * @memberof Wallet
     * @void
     * @function
     * @instance
     * @param {Operation} op - Operation to add
     * @throws {Error} INVALID_OPERATION
     */
    addOperation(op) {
        if (!isValidOperation(op)) {
            throw new Error(WalletErrors.INVALID_OPERATION);
        }
        const { description, type, amount } = op;
        const currentMS = new Date().getTime();
        const operation = {
            id: currentMS,
            amount: parseFloat(amount),
            description: description.trim(),
            type,
            date: currentMS,
        };
        if (type === OpType.IN) {
            this.#balance += operation.amount;
        } else if (type === OpType.OUT) {
            this.#balance -= operation.amount;
        }
        this.#operations.push(operation);
        this.saveWallet();
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
     */
    removeOperation(opId) {
        const operationIndex = this.#operations.findIndex(
            ({ id }) => id === opId
        );
        if (operationIndex === -1) {
            throw new Error(WalletErrors.OPERATION_NOT_FOUND);
        }
        const { type, amount } = this.#operations[operationIndex];
        if (type === OpType.IN) {
            this.#balance -= amount;
        } else if (type === OpType.OUT) {
            this.#balance += amount;
        }
        this.#operations.splice(operationIndex, 1);
        this.saveWallet();
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
