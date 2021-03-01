import Wallet from './Wallet';
import { WalletErrors } from './enums';
const mockedStructures = require('../../../jest/mockedStructures');

const resetWallet = function () {
    // Reset operations
    Wallet.getOperations().forEach(({ id }) => Wallet.removeOperation(id));
};
describe('Wallet testing suite', function () {
    beforeEach(function () {
        localStorage.clear();
        resetWallet();
    });
    it('First instance should be an empty Wallet', function () {
        expect(Wallet.getBalance()).toBe(0);
        expect(Wallet.getOperations().length).toBe(0);
    });
    it('addOperation: it works with an income operation', function () {
        Wallet.addOperation(mockedStructures.incomeOperation);
        expect(Wallet.getBalance()).toBe(
            mockedStructures.incomeOperation.amount
        );
        expect(Wallet.getOperations().length).toBe(1);
    });
    it('addOperation: it works with an outcome operation', function () {
        Wallet.addOperation(mockedStructures.outOperation);
        expect(Wallet.getBalance()).toBe(-mockedStructures.outOperation.amount);
        expect(Wallet.getOperations().length).toBe(1);
    });
    it('addOperation: it fires an error when adding an invalid operation', function () {
        try {
            Wallet.addOperation(mockedStructures.invalidOperation);
        } catch (e) {
            expect(e.message).toBe(WalletErrors.INVALID_OPERATION);
        }
    });
    it('removeOperation: it works removing an income operation', function () {
        Wallet.addOperation(mockedStructures.incomeOperation);
        const lastOperationAdded = Wallet.getOperations()[0];
        Wallet.removeOperation(lastOperationAdded.id);
        expect(Wallet.getBalance()).toBe(0);
        expect(Wallet.getOperations().length).toBe(0);
    });
    it('removeOperation: it works removing an outcome operation', function () {
        Wallet.addOperation(mockedStructures.outOperation);
        const lastOperationAdded = Wallet.getOperations()[0];
        Wallet.removeOperation(lastOperationAdded.id);
        expect(Wallet.getBalance()).toBe(0);
        expect(Wallet.getOperations().length).toBe(0);
    });
    it('removeOperation: it fires the correct error when date/id not found', function () {
        try {
            Wallet.removeOperation(242389239);
        } catch (e) {
            expect(e.message).toBe(WalletErrors.OPERATION_NOT_FOUND);
        }
    });
    it('findOperation: it works finding a correct operation passing a search value', function () {
        Wallet.addOperation(mockedStructures.incomeOperation);
        const searchValue = mockedStructures.incomeOperation.description.substring(
            0,
            2
        );
        const operationsFound = Wallet.findOperation(searchValue);
        expect(operationsFound.length).toBe(1);
    });
    it('saveWallet: it saves correctly into the localstorage', function () {
        Wallet.addOperation(mockedStructures.incomeOperation);
        const savedWallet = localStorage.getItem('wallet');
        expect(JSON.parse(savedWallet)).toEqual({
            balance: Wallet.getBalance(),
            operations: Wallet.getOperations(),
        });
    });
});
