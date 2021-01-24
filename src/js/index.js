(function(context) {
    var wallet;
    context.addOperation = function (op) {
        wallet.addOperation(op);
    }
    context.removeOperation = function (id) {
        wallet.removeOperation(id);
    }
    context.findOperation = function() {

    }
    context.getBalance = function() {
        return wallet.getBalance();
    }
    context.getOperations = function() {
        return wallet.getOperations();
    }

    document.addEventListener('DOMContentLoaded', function() {
        wallet = new Wallet();
    });
})(window);