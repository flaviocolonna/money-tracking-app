import { getWallet, isValidOperation } from '../utils';
import { WalletErrors, OpType, WalletSubjects } from './enums';
import EventManager from './EventManager';

class Wallet extends EventManager {
    #balance = 0;
    #operations = [];

    constructor() {
        super();
        this.#init();
    }

    #init() {
        const { balance, operations } = getWallet();
        // eslint-disable-next-line no-invalid-this
        this.#balance = balance;
        // eslint-disable-next-line no-invalid-this
        this.#operations = operations;
    }

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
    findOperation(searchValue) {
        const val = searchValue?.toLowerCase().trim();
        if (!val) {
            return this.#operations;
        }
        return this.#operations.filter(({ description }) =>
            description.toLowerCase().includes(val)
        );
    }
    getBalance() {
        return this.#balance;
    }
    getOperations() {
        return this.#operations;
    }
}

export default new Wallet();
