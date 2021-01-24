(function() {
    var wallet;
    function addOperation(op) {
        wallet.addOperation(op);
    }
    function removeOperation() {

    }
    function findOperation() {

    }
    function getBalance() {
        return wallet.getBalance();
    }
    function getOperations() {
        return wallet.getOperations();
    }

    document.addEventListener('DOMContentLoaded', function() {
        wallet = new Wallet();
    });
})();