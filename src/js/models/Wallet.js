var OpType = {
    OUT: 'OUT',
    IN: 'IN'
}
var WalletErrors = {
    INVALID_OPERATION: 'INVALID_OPERATION',
    OPERATION_NOT_FOUND: 'OPERATION_NOT_FOUND'
}
function getWallet() {
    var wallet = localStorage.getItem('wallet');
    if(!wallet) {
        return {
            balance: 0,
            operations: []
        }
    }
    return JSON.parse(wallet);
}
function isValidOperation(op) {
    return op && op.description && parseFloat(op.amount) > 0 && typeof OpType[op.type] !== 'undefined';
}
function Wallet() {
    var balance = 0;
    var operations = [];
    function init() {
        var wallet = getWallet();
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
        var operation = {
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
        var operationIndex = findIndex(operations, function(operation) {
            return operation.date === id;
        });
        if(operationIndex === -1) {
            throw new Error(WalletErrors.OPERATION_NOT_FOUND);
        }
        var operation = operations[operationIndex];
        if(operation.type === OpType.IN) {
            balance -= operation.amount;
        } else if(operation.type === OpType.OUT) {
            balance += operation.amount;
        }
        operations.splice(operationIndex, 1);
        saveWallet();
    }
    this.findOperation = function(searchValue) {
        var val = searchValue.toLowerCase().trim();
        var operationsFound = [];
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