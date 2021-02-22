import { getWallet, isValidOperation, findIndex } from "../utils";
import { WalletErrors, OpType } from "./enums";

class Wallet {
    constructor() {
        this.balance = 0;
        this.operations = [];
        this.init();
    }
    init() {
        const wallet = getWallet();
        this.balance = wallet.balance;
        this.operations = wallet.operations;
    }
    saveWallet() {
        localStorage.setItem('wallet', JSON.stringify({ balance: this.balance, operations: this.operations }));
    }
    addOperation(op) {
        if (!isValidOperation(op)) {
            throw new Error(WalletErrors.INVALID_OPERATION);
        }
        const operation = {
            id: new Date().getTime(),
            amount: parseFloat(op.amount),
            description: op.description.trim(),
            type: op.type,
            date: new Date().getTime()
        }
        if (op.type === OpType.IN) {
            this.balance += operation.amount;
        } else if (op.type === OpType.OUT) {
            this.balance -= operation.amount;
        }
        this.operations.push(operation);
        this.saveWallet();
    }
    removeOperation(id) {
        const operationIndex = findIndex(this.operations, operation => operation.id === id);
        if (operationIndex === -1) {
            throw new Error(WalletErrors.OPERATION_NOT_FOUND);
        }
        const operation = this.operations[operationIndex];
        if (operation.type === OpType.IN) {
            this.balance -= operation.amount;
        } else if (operation.type === OpType.OUT) {
            this.balance += operation.amount;
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
        for (var i = 0; i < this.operations.length; i++) {
            const description = this.operations[i].description.toLowerCase();
            if (description.indexOf(val) > -1) {
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