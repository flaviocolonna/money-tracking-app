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
function Wallet() {
    var balance = 0;
    var operations = [];
    function init() {
        var wallet = getWallet();
        balance = wallet.balance;
        operations = wallet.operations;
    }
    this.addOperation = function() {

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