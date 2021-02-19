const Wallet = require("./models/Wallet").Wallet;

let wallet;
const addOperation = function (op) {
    try {
        wallet.addOperation(op);
    } catch (e) {
        console.error(e);
    }
}
const removeOperation = function (id) {
    try {
        wallet.removeOperation(id);
    } catch (e) {
        console.error(e);
    }
}
const findOperation = function (val) {
    return wallet.findOperation(val);
}
const getBalance = function () {
    return wallet.getBalance();
}
const getOperations = function () {
    return wallet.getOperations();
}
const toggleModal = function() {
    const modalComponent = document.getElementById('modal');
    if(!modalComponent) {
        return;
    }
    const isHidden = modalComponent.classList.contains('hide');
    if(isHidden) {
        modalComponent.classList.remove('hide');
        return;
    }
    modalComponent.classList.add('hide');
}
window.toggleModal = toggleModal;
window.addEventListener('DOMContentLoaded', function () {
    wallet = new Wallet();
});