const OpType = Object.freeze({
    OUT: 'OUT',
    IN: 'IN'
});
const WalletErrors = Object.freeze({
    INVALID_OPERATION: 'INVALID_OPERATION',
    OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND'
});
function Wallet() {
    let balance = 0;
    let operations = [];
    function init() {
        const wallet = getWallet();
        balance = wallet.balance;
        operations = wallet.operations;
    }
    function saveWallet() {
        localStorage.setItem('wallet', JSON.stringify({ balance: balance, operations: operations }));
    }
    this.addOperation = function(op) {
        if(!isValidOperation(op)) {
            throw new Error(WalletErrors.INVALID_OPERATION);
        }
        const operation = {
            amount: parseFloat(op.amount),
            description: op.description.trim(),
            type: op.type,
            date: new Date().getTime()
        }
        if(op.type === OpType.IN) {
            balance += operation.amount;
        } else if(op.type === OpType.OUT) {
            balance -= operation.amount;
        }
        operations.push(operation);
        saveWallet();
    }
    this.removeOperation = function(id) {
        const operationIndex = findIndex(operations, function(operation) {
            return operation.date === id;
        });
        if(operationIndex === -1) {
            throw new Error(WalletErrors.OPERATION_NOT_FOUND);
        }
        const operation = operations[operationIndex];
        if(operation.type === OpType.IN) {
            balance -= operation.amount;
        } else if(operation.type === OpType.OUT) {
            balance += operation.amount;
        }
        operations.splice(operationIndex, 1);
        saveWallet();
    }
    this.findOperation = function(searchValue) {
        const val = searchValue.toLowerCase().trim();
        const operationsFound = [];
        for(var i = 0; i < operations.length; i++) {
            var description = operations[i].description.toLowerCase();
            if(description.indexOf(val) > -1) {
                operationsFound.push(operations[i]);
                break;
            }
        }
        return operationsFound;
    }
    this.getBalance = function() {
        return balance;
    }
    this.getOperations = function() {
        return operations;
    }
    init();
}