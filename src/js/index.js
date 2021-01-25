(function(context) {
    let wallet;
    context.addOperation = function (op) {
        try {
            wallet.addOperation(op);
        } catch(e) {
            console.error(e);
        }
    }
    context.removeOperation = function (id) {
        try {
            wallet.removeOperation(id);
        } catch(e) {
            console.error(e);
        }
    }
    context.findOperation = function(val) {
        return wallet.findOperation(val);
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