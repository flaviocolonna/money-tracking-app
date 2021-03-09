import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Wallet from './models/Wallet';
import { SnackbarTypes, WalletSubjects } from './models/enums';

/**
 * Methods that are binded to the UI Elements
 * @name UIMethods
 * @namespace
 */

/**
 * Methods that are used to create ui elements
 * @name UIHelpers
 * @namespace
 */

let snackBarTimeout;
/**
 * Invoke it to close the snackbar.
 * @name hideSnackbar
 * @function
 * @memberof UIMethods
 * @void
 */
const hideSnackbar = function () {
    const toastElement = document.getElementById('toast');
    toastElement?.classList.remove('show');
    toastElement?.classList.remove('toast--error');
};
/**
 * Show a message to the user using a bottom snackbar.
 * @name showMessage
 * @function
 * @void
 * @memberof UIHelpers
 * @param {string} msg - A message to show in the snackbar
 * @param {SnackbarType} type - The type between SUCCESS or ERROR
 */
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
};
/**
 * Invoke it from a submit button in the form
 * @name addOperation
 * @function
 * @memberof UIMethods
 * @void
 * @param {MouseEvent} ev - Event object received from the function call
 */
const addOperation = function (ev) {
    ev.preventDefault();
    const { target } = ev;
    const formElmnt = target.closest('form');
    if (!formElmnt) {
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
        Wallet.addOperation(operation);
        formElmnt.reset();
        toggleModal();
        showMessage('Operation added successfully!', SnackbarTypes.SUCCESS);
    } catch (e) {
        console.error(e);
        showMessage('Operation not added!', SnackbarTypes.ERROR);
    }
};
/**
 * Invoke it to delete a specific operation
 * @name removeOperation
 * @function
 * @memberof UIMethods
 * @void
 * @param {number} id - Identifier of the operation
 */
const removeOperation = function (id) {
    try {
        Wallet.removeOperation(id);
        showMessage('Operation removed successfully!', SnackbarTypes.SUCCESS);
    } catch (e) {
        console.error(e);
        showMessage('Operation not removed!', SnackbarTypes.ERROR);
    }
};
/**
 * Invoke it to restore the search and the operations table
 * @name resetSearch
 * @function
 * @memberof UIMethods
 * @void
 * @param {MouseEvent} event - Event passed from the mouse click
 */
const resetSearch = function (event) {
    event.preventDefault();
    const { target } = event;
    const formElement = target.closest('form');
    if (!formElement) {
        return;
    }
    formElement.reset();
    updateOperationsTable();
};
/**
 * Invoke it to perform a search in the wallet.
 * It matches the search term with the description.
 * @name searchOperation
 * @function
 * @memberof UIMethods
 * @void
 * @param {MouseEvent} event - Event passed from the mouse click
 */
const searchOperation = function (event) {
    event.preventDefault();
    const {
        searchInput: { value },
    } = event.target;
    const operationsToAdd = Wallet.findOperation(value);
    updateOperationsTable(operationsToAdd);
};
/**
 * It returns the balance from the wallet
 * @name getBalance
 * @function
 * @return {number}
 */
const getBalance = function () {
    return Wallet.getBalance();
};
/**
 * It returns the operations list from the wallet
 * @name getOperations
 * @function
 * @return {Array<Operation>}
 */
const getOperations = function () {
    return Wallet.getOperations();
};
/**
 * It toggles the modal view
 * @name toggleModal
 * @function
 * @memberof UIMethods
 * @void
 */
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
};
/**
 * It updates the total balance shown in the header
 * @name updateBalance
 * @memberof UIHelpers
 * @function
 * @void
 */
const updateBalance = function () {
    const balanceElement = document.getElementById('balance-box');
    if (!balanceElement) {
        return;
    }
    balanceElement.textContent = parseFloat(getBalance()).toLocaleString();
};
/**
 * It updates the operations shown in the operations table.
 * By default it renders the wallet's operations.
 * @name updateOperationsTable
 * @memberof UIHelpers
 * @function
 * @param {Array<Operation>} [originalOperations] - The list of operations to show in the table.
 * @void
 */
const updateOperationsTable = function (originalOperations = getOperations()) {
    const tableContainerElement = document.getElementById('table-container');
    const tableElement = document.getElementById('table-body');
    if (
        !Array.isArray(originalOperations) ||
        !tableElement ||
        !tableContainerElement
    ) {
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
};
/**
 * It builds the table row that contains the operation.
 * @name getOperationTableRow
 * @function
 * @memberof UIHelpers
 * @param {Operation} operation - Operation to add
 * @return {HTMLElement}
 */
const getOperationTableRow = function (operation) {
    // Add operation to table
    const trRow = document.createElement('tr');
    trRow.setAttribute('data-op-type', operation.type.toLowerCase());
    const cells = [
        {
            value: operation.description,
        },
        {
            value: parseFloat(operation.amount).toLocaleString(),
            classes: 'operation-amount',
        },
        {
            value: new Date(operation.date).toLocaleString(),
        },
    ];
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
};
/**
 * It builds the delete action button for the operation table row.
 * @name getDeleteActionBtn
 * @memberof UIHelpers
 * @function
 * @param {Operation} operation - Operation to add
 * @return {HTMLElement}
 */
const getDeleteActionBtn = function (operation) {
    const tdAction = document.createElement('td');
    tdAction.className = 'align-text-center';
    const actionButton = document.createElement('button');
    actionButton.className = 'button button-icon button-animated icon-delete';
    actionButton.onclick = function () {
        removeOperation(operation.id);
    };
    tdAction.appendChild(actionButton);
    return tdAction;
};
/**
 * It shows or hides the reset button.
 * @name onSearchInputChange
 * @function
 * @memberof UIMethods
 * @param {MouseEvent} event - Event received on search input value change
 */
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
};
window.hideSnackbar = hideSnackbar;
window.addOperation = addOperation;
window.toggleModal = toggleModal;
window.searchOperation = searchOperation;
window.resetSearch = resetSearch;
window.onSearchInputChange = onSearchInputChange;

Wallet.subscribe(WalletSubjects.WALLET_SAVED, () => {
    updateBalance();
    updateOperationsTable();
});
window.addEventListener('DOMContentLoaded', function () {
    updateBalance();
    updateOperationsTable();
});
