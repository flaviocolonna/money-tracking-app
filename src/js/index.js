const Wallet = require("./models/Wallet").Wallet;
const Enums = require("./models/enums");

let wallet;

const hideSnackbar = function () {
    const toastElement = document.getElementById('toast');
    toastElement.classList.remove('show');
    toastElement.classList.remove('toast--error');
}
const showMessage = function (msg, type) {
    const toastElement = document.getElementById('toast');
    if (!toastElement || !msg || !Enums.SnackbarTypes[type]) {
        return;
    }
    if (type === Enums.SnackbarTypes.ERROR) {
        toastElement.classList.add('toast--error');
    }
    const messageElement = toastElement.querySelector('.toast__message');
    messageElement.textContent = msg;
    toastElement.classList.add('show');
    setTimeout(function () {
        hideSnackbar();
    }, 5000);
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
        updateBalance();
        ev.target.reset();
        updateOperationsTable();
        toggleModal();
        showMessage('Operation added successfully!', Enums.SnackbarTypes.SUCCESS);
    } catch (e) {
        console.error(e);
        showMessage('Operation not added!', Enums.SnackbarTypes.ERROR);
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
const toggleModal = function () {
    const modalComponent = document.getElementById('modal');
    if (!modalComponent) {
        return;
    }
    const isHidden = modalComponent.classList.contains('hide');
    if (isHidden) {
        modalComponent.classList.remove('hide');
        return;
    }
    modalComponent.classList.add('hide');
}
const updateBalance = function () {
    const balanceElement = document.getElementById('balance-box');
    if (!balanceElement) {
        return;
    }
    balanceElement.textContent = getBalance();
}
const updateOperationsTable = function () {
    const operations = Array.from(getOperations());
    const tableElement = document.getElementById('table-body');
    if (!tableElement) {
        return;
    }
    tableElement.innerHTML = '';
    operations.reverse().forEach(function(operation) {
        tableElement.appendChild(getOperationTableRow(operation));
    });
}
const getOperationTableRow = function (operation) {
    // Add operation to table
    const trRow = document.createElement('tr');
    trRow.setAttribute('data-op-type', operation.type.toLowerCase());
    const cells = [{
        value: operation.description
    }, {
        value: operation.amount,
        classes: 'operation-amount'
    }, {
        value: new Date(operation.date).toLocaleString(),
    }];
    cells.forEach(function (cell) {
        const td = document.createElement('td');
        td.textContent = cell.value;
        if (cell.classes) {
            td.className = cell.classes;
        }
        trRow.appendChild(td);
    });
    trRow.appendChild(getDeleteActionBtn(operation));
    return trRow;
}
const getDeleteActionBtn = function (operation) {
    const tdAction = document.createElement('td');
    tdAction.className = 'align-text-center';
    const actionButton = document.createElement('button');
    actionButton.className = 'button button-icon button-animated icon-delete';
    actionButton.onclick = function () {
        removeOperation(operation.id);
    }
    tdAction.appendChild(actionButton);
    return tdAction;
}
window.hideSnackbar = hideSnackbar;
window.addOperation = addOperation;
window.toggleModal = toggleModal;
window.addEventListener('DOMContentLoaded', function () {
    wallet = new Wallet();
    updateBalance();
    updateOperationsTable();
});