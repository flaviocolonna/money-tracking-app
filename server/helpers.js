const { OpType } = require('./enums');

const isValidOperation = (op) =>
    op?.description &&
    parseFloat(op?.amount) > 0 &&
    typeof OpType[op?.type] !== 'undefined';

module.exports = {
    isValidOperation,
};
