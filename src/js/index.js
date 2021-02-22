import Wallet from "./models/Wallet";
import { SnackbarTypes } from "./models/enums";

let wallet;
let snackBarTimeout;

const hideSnackbar = function () {
    const toastElement = document.getElementById('toast');
    toastElement?.classList.remove('show');
    toastElement?.classList.remove('toast--error');
}
const showMessage = function (msg, type) {
    const toastElement = document.getElementById('toast');
    if (!toastElement || !msg || !SnackbarTypes[type]) {
        return;
    }
    if (type === SnackbarTypes.ERROR) {
        toastElement.classList.add('toast--error');
    }
    const messageElement = toastElement.querySelector('.toast__message');
    messageElement.textContent = msg;
    toastElement.classList.add('show');
    clearTimeout(snackBarTimeout);
    snackBarTimeout = setTimeout(function () {
        hideSnackbar();
    }, 5000);
}
const addOperation = function (ev) {
    ev.preventDefault();
    const { target } = ev;
    const formElmnt = target.closest('form');
    if(!formElmnt) {
        return;
    }
    const { amount: amountInput, description: descriptionInput } = formElmnt;
    const type = target.getAttribute('data-type');
    const operation = {
        amount: amountInput.value,
        description: descriptionInput.value,
        type,
    };
    try {
        wallet.addOperation(operation);
        updateBalance();
        formElmnt.reset();
        updateOperationsTable();
        toggleModal();
        showMessage('Operation added successfully!', SnackbarTypes.SUCCESS);
    } catch (e) {
        console.error(e);
        showMessage('Operation not added!', SnackbarTypes.ERROR);
    }
}
const removeOperation = function (id) {
    try {
        wallet.removeOperation(id);
        updateOperationsTable();
        updateBalance();
        showMessage('Operation removed successfully!', SnackbarTypes.SUCCESS);
    } catch (e) {
        console.error(e);
        showMessage('Operation not removed!', SnackbarTypes.ERROR);
    }
}
const resetSearch = function (event) {
    event.preventDefault();
    const { target } = event;
    const formElement = target.closest('form');
    if (!formElement) {
        return;
    }
    formElement.reset();
    updateOperationsTable();
}
const searchOperation = function (event) {
    event.preventDefault();
    const { searchInput: { value } } = event.target;
    const operationsToAdd = wallet.findOperation(value);
    updateOperationsTable(operationsToAdd);
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
    balanceElement.textContent = parseFloat(getBalance()).toLocaleString();
}
const updateOperationsTable = function (originalOperations = getOperations()) {
    const tableContainerElement = document.getElementById('table-container');
    const tableElement = document.getElementById('table-body');
    if(!Array.isArray(originalOperations) || !tableElement || !tableContainerElement) {
        return;
    }
    const operations = [...originalOperations];
    tableElement.innerHTML = '';
    if (!operations.length) {
        tableContainerElement.classList.add('no-data');
        return;
    }
    tableContainerElement.classList.remove('no-data');
    operations.reverse().forEach(function (operation) {
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
        value: parseFloat(operation.amount).toLocaleString(),
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
const onSearchInputChange = function (event) {
    const { value: searchValue } = event.target;
    const resetSearchElmnt = document.getElementById('reset-search-btn');
    if (!resetSearchElmnt) {
        return;
    }
    if (!searchValue) {
        resetSearchElmnt.classList.add('hide');
        return;
    }
    resetSearchElmnt.classList.remove('hide');
}
window.hideSnackbar = hideSnackbar;
window.addOperation = addOperation;
window.toggleModal = toggleModal;
window.searchOperation = searchOperation;
window.resetSearch = resetSearch;
window.onSearchInputChange = onSearchInputChange;
window.addEventListener('DOMContentLoaded', function () {
    wallet = new Wallet();
    updateBalance();
    updateOperationsTable();
});