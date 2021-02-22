const utilsTasks = require("../utils");
const WalletEnums = require("./enums");

class Wallet {
    constructor() {
        this.balance = 0;
        this.operations = [];
        this.init();
    }
    init() {
        const wallet = utilsTasks.getWallet();
        this.balance = wallet.balance;
        this.operations = wallet.operations;
    }
    saveWallet() {
        localStorage.setItem('wallet', JSON.stringify({ balance: this.balance, operations: this.operations }));
    }
    addOperation(op) {
        if (!utilsTasks.isValidOperation(op)) {
            throw new Error(WalletEnums.WalletErrors.INVALID_OPERATION);
        }
        const operation = {
            id: new Date().getTime(),
            amount: parseFloat(op.amount),
            description: op.description.trim(),
            type: op.type,
            date: new Date().getTime()
        }
        if (op.type === WalletEnums.OpType.IN) {
            this.balance += operation.amount;
        } else if (op.type === WalletEnums.OpType.OUT) {
            this.balance -= operation.amount;
        }
        this.operations.push(operation);
        this.saveWallet();
    }
    removeOperation(id) {
        const operationIndex = utilsTasks.findIndex(this.operations, operation => operation.id === id);
        if (operationIndex === -1) {
            throw new Error(WalletEnums.WalletErrors.OPERATION_NOT_FOUND);
        }
        const operation = this.operations[operationIndex];
        if (operation.type === WalletEnums.OpType.IN) {
            this.balance -= operation.amount;
        } else if (operation.type === WalletEnums.OpType.OUT) {
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

module.exports = Wallet;