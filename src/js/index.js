const Wallet = require("./models/Wallet").Wallet;

let wallet;

const resetFormFields = function(form) {
    const amountInput = form.amount;
    const descriptionInput = form.description
    amountInput.value = 0;
    descriptionInput.value = '';
}
const addOperation = function (ev) {
    ev.preventDefault();
    const submitButton = ev.submitter;
    const type = submitButton.getAttribute('data-type');
    const amountInput = ev.target.amount;
    const descriptionInput = ev.target.description;
    const operation = {
        amount: amountInput.value,
        description: descriptionInput.value,
        type,
    };
    try {
        wallet.addOperation(operation);
        toggleModal();
        resetFormFields(ev.target);
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
window.addOperation = addOperation;
window.toggleModal = toggleModal;
window.addEventListener('DOMContentLoaded', function () {
    wallet = new Wallet();
});