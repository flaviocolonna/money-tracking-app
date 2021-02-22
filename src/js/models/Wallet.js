import { getWallet, isValidOperation, findIndex } from "../utils";
import { WalletErrors, OpType } from "./enums";

class Wallet {
    constructor() {
        this.balance = 0;
        this.operations = [];
        this.init();
    }
    init() {
        const { balance, operations } = getWallet();
        this.balance = balance;
        this.operations = operations;
    }
    saveWallet() {
        localStorage.setItem('wallet', JSON.stringify({ balance: this.balance, operations: this.operations }));
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
            date: currentMS
        }
        if (type === OpType.IN) {
            this.balance += operation.amount;
        } else if (type === OpType.OUT) {
            this.balance -= operation.amount;
        }
        this.operations.push(operation);
        this.saveWallet();
    }
    removeOperation(opId) {
        const operationIndex = findIndex(this.operations, ({ id }) => id === opId);
        if (operationIndex === -1) {
            throw new Error(WalletErrors.OPERATION_NOT_FOUND);
        }
        const { type, amount } = this.operations[operationIndex];
        if (type === OpType.IN) {
            this.balance -= amount;
        } else if (type === OpType.OUT) {
            this.balance += amount;
        }
        this.operations.splice(operationIndex, 1);
        this.saveWallet();
    }
    findOperation(searchValue) {
        const val = searchValue.toLowerCase().trim();
        if (!val) {
            return this.operations;
        }
        const operationsFound = [];
        for (let i = 0; i < this.operations.length; i++) {
            const { description } = this.operations[i];
            if (description.toLowerCase().indexOf(val) > -1) {
                operationsFound.push(this.operations[i]);
            }
        }
        return operationsFound;
    }
    getBalance() {
        return this.balance;
    }
    getOperations() {
        return this.operations;
    }
}

export default Wallet;