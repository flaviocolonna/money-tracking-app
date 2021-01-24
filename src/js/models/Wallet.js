var OpType = {
    OUT: 'OUT',
    IN: 'IN'
}
var WalletErrors = {
    INVALID_OPERATION: 'INVALID_OPERATION'
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
            description: op.description,
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
    this.removeOperation = function() {
    
    }
    this.findOperation = function() {
    
    }
    this.getBalance = function() {
        return balance;
    }
    this.getOperations = function() {
        return operations;
    }
    init();
}