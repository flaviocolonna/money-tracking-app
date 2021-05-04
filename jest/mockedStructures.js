const WalletEnums = require('../src/js/models/enums');
const incomeOperation = {
    description: 'Salary',
    amount: 1000,
    type: WalletEnums.OpType.IN,
};
const outOperation = {
    description: 'Bill',
    amount: 100,
    type: WalletEnums.OpType.OUT,
};
const invalidOperation = {
    description: 'Salary',
    amount: 0,
    type: WalletEnums.OpType.IN,
};
module.exports = {
    incomeOperation,
    invalidOperation,
    outOperation,
};
