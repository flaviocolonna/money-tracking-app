var OpType = {
    OUT: 0,
    IN: 1
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
function saveWallet(wallet) {
    localStorage.setItem('wallet', JSON.stringify(wallet));
}
function Wallet() {
    var balance = 0;
    var operations = [];
    function init() {
        var wallet = getWallet();
        balance = wallet.balance;
        operations = wallet.operations;
    }
    this.addOperation = function(op) {
        var operation = {
            amount: op.amount,
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