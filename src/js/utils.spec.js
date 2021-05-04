import { isValidOperation, getWallet } from './utils';
import axios from 'axios';
const mockedStructures = require('../../jest/mockedStructures');

jest.mock('axios');

describe('Utils testing suite', function () {
    it('isValidOperation returns true if operation is valid', function () {
        expect(isValidOperation(mockedStructures.incomeOperation)).toBeTruthy();
    });
    it('isValidOperation returns false if operation is not valid', function () {
        expect(isValidOperation(mockedStructures.invalidOperation)).toBeFalsy();
    });
    it('getWallet returns correct wallet from the server', async function () {
        const wallet = {
            balance: mockedStructures.incomeOperation.amount,
            operations: [mockedStructures.incomeOperation],
        };
        axios.get.mockResolvedValueOnce({
            data: wallet,
        });
        const walletReceived = await getWallet();
        expect(walletReceived).toEqual(wallet);
    });
    it('getWallet returns an error wallet if a network error is fired', async function () {
        try {
            await getWallet();
        } catch (e) {
            expect(e).toBeTruthy();
        }
    });
});
