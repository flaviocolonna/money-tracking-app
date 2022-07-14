import Wallet from './Wallet';
import { WalletErrors } from './enums';
import axios from 'axios';
const mockedStructures = require('../../../jest/mockedStructures');

jest.mock('axios');

describe('Wallet testing suite', function () {
    it('First instance should be an empty Wallet', function () {
        expect(Wallet.getBalance()).toBe(0);
        expect(Wallet.getOperations().length).toBe(0);
    });
    it('Update wallet sets correctly balance and operations', async function () {
        axios.get.mockResolvedValueOnce({
            data: {
                balance: 100,
                operations: [mockedStructures.incomeOperation],
            },
        });
        await Wallet.updateWallet();
        expect(Wallet.getBalance()).toBe(100);
        expect(Wallet.getOperations().length).toBe(1);
    });
    it('addOperation: it works with an income operation', async function () {
        axios.get.mockResolvedValueOnce({
            data: {
                balance: mockedStructures.incomeOperation.amount,
                operations: [mockedStructures.incomeOperation],
            },
        });
        axios.post.mockImplementationOnce(() => Promise.resolve());
        await Wallet.addOperation(mockedStructures.incomeOperation);
        expect(Wallet.getBalance()).toBe(
            mockedStructures.incomeOperation.amount
        );
        expect(Wallet.getOperations().length).toBe(1);
    });
    it('addOperation: it works with an outcome operation', async function () {
        axios.get.mockResolvedValueOnce({
            data: {
                balance: -mockedStructures.outOperation.amount,
                operations: [mockedStructures.outOperation],
            },
        });
        axios.post.mockImplementationOnce(() => Promise.resolve());
        await Wallet.addOperation(mockedStructures.outOperation);
        expect(Wallet.getBalance()).toBe(-mockedStructures.outOperation.amount);
        expect(Wallet.getOperations().length).toBe(1);
    });
    it('addOperation: it fires an error when adding an invalid operation', async function () {
        try {
            await Wallet.addOperation(mockedStructures.invalidOperation);
        } catch (e) {
            expect(e.message).toBe(WalletErrors.INVALID_OPERATION);
        }
    });
    it('removeOperation: it works removing an income operation', async function () {
        axios.get.mockResolvedValueOnce({
            data: {
                balance: mockedStructures.incomeOperation.amount,
                operations: [mockedStructures.incomeOperation],
            },
        });
        axios.post.mockImplementationOnce(() => Promise.resolve());
        await Wallet.addOperation(mockedStructures.incomeOperation);
        const lastOperationAdded = Wallet.getOperations()[0];
        // We simulate the server that has removed the operation returning 0 as balance and no operations
        axios.get.mockResolvedValueOnce({
            data: {
                balance: 0,
                operations: [],
            },
        });
        axios.delete.mockImplementationOnce(() => Promise.resolve());
        await Wallet.removeOperation(lastOperationAdded.id);
        expect(Wallet.getBalance()).toBe(0);
        expect(Wallet.getOperations().length).toBe(0);
    });
    it('removeOperation: it works removing an outcome operation', async function () {
        axios.get.mockResolvedValueOnce({
            data: {
                balance: -mockedStructures.outOperation.amount,
                operations: [mockedStructures.outOperation],
            },
        });
        axios.post.mockImplementationOnce(() => Promise.resolve());
        await Wallet.addOperation(mockedStructures.outOperation);
        const lastOperationAdded = Wallet.getOperations()[0];
        // We simulate the server that has removed the operation returning 0 as balance and no operations
        axios.get.mockResolvedValueOnce({
            data: {
                balance: 0,
                operations: [],
            },
        });
        axios.delete.mockImplementationOnce(() => Promise.resolve());
        await Wallet.removeOperation(lastOperationAdded.id);
        expect(Wallet.getBalance()).toBe(0);
        expect(Wallet.getOperations().length).toBe(0);
    });
    it('removeOperation: it fires the correct error when date/id not found', async function () {
        try {
            axios.get.mockResolvedValueOnce({
                data: {
                    balance: -mockedStructures.outOperation.amount,
                    operations: [mockedStructures.outOperation],
                },
            });
            axios.post.mockImplementationOnce(() => Promise.resolve());
            await Wallet.addOperation(mockedStructures.outOperation);
            // The id is different from the outOperation id previously added
            await Wallet.removeOperation(242389239);
        } catch (e) {
            expect(e.message).toBe(WalletErrors.OPERATION_NOT_FOUND);
        }
    });
    it('findOperation: it works finding a correct operation passing a search value', async function () {
        axios.get.mockResolvedValueOnce({
            data: {
                balance: -mockedStructures.incomeOperation.amount,
                operations: [mockedStructures.incomeOperation],
            },
        });
        axios.post.mockImplementationOnce(() => Promise.resolve());
        await Wallet.addOperation(mockedStructures.incomeOperation);
        const { description } = mockedStructures.incomeOperation;
        const searchValue = description.substring(0, 2);
        const operationsFound = Wallet.findOperation(searchValue);
        expect(operationsFound.length).toBe(1);
    });
});
