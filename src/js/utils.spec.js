const utils = require("./utils");
const Wallet = require("./models/Wallet");

describe("Utils testing suite", function() {

    beforeEach(function() {
        localStorage.removeItem("wallet");
    });
    it("findIndex returns correct index", function() {
        const list = [1, 2, 3, 4];
        const index = utils.findIndex(list, function(item) {
            return item === 3;
        });
        expect(index).toBe(2);
    });
    it("findIndex returns -1 when item not found", function() {
        const list = [1, 2, 3, 4];
        const index = utils.findIndex(list, function(item) {
            return item === 10;
        });
        expect(index).toBe(-1);
    });
    it("isValidOperation returns true if operation is valid", function() {
        const operation = {
            description: "Salary",
            amount: 1000,
            type: Wallet.OpType.IN
        }
        expect(utils.isValidOperation(operation)).toBeTruthy();
    });
    it("isValidOperation returns false if operation is not valid", function() {
        const operation = {
            description: "Salary",
            amount: 0,
            type: Wallet.OpType.IN
        }
        expect(utils.isValidOperation(operation)).toBeFalsy();
    });
    it("getWallet returns correct wallet if it exists in the local storage", function() {
        const operation = {
            description: "Salary",
            amount: 1000,
            type: Wallet.OpType.IN
        }
        const wallet = {
            balance: 1000,
            operations: [operation]
        }
        localStorage.setItem('wallet', JSON.stringify(wallet));
        expect(utils.getWallet()).toEqual(wallet);
    });
    it("getWallet returns standard wallet if it doesn't exist in the local storage", function() {
        const wallet = {
            balance: 0,
            operations: []
        }
        expect(utils.getWallet()).toEqual(wallet);
    });
    
});