const db = require('quick.db');
const { WalletErrors, OpType } = require('./enums');
const { isValidOperation } = require('./helpers');
const WalletDBEntity = 'wallet';
const initialWalletState = { operations: [], balance: 0 };

const initWallet = () => {
    if (!db.get(WalletDBEntity)) {
        db.set(WalletDBEntity, initialWalletState);
    }
};
const addOperationHandler = function (req, res) {
    const { body: operationData } = req;
    if (!isValidOperation(operationData)) {
        res.code(400);
        res.json({ error: WalletErrors.INVALID_OPERATION });
        return;
    }
    const currentMS = new Date().getTime();
    const operationToAdd = {
        ...operationData,
        date: currentMS,
        id: currentMS,
    };
    let balance = db.get(`${WalletDBEntity}.balance`);
    if (operationToAdd.type === OpType.IN) {
        balance += operationToAdd.amount;
    } else if (operationToAdd.type === OpType.OUT) {
        balance -= operationToAdd.amount;
    }
    db.push(`${WalletDBEntity}.operations`, operationToAdd);
    db.set(`${WalletDBEntity}.balance`, balance);
    res.code(201);
    res.send(operationToAdd);
};
const removeOperationHandler = function (req, res) {
    const { id } = req.params;
    if (!id) {
        res.code(404);
        res.send();
        return;
    }
    const operations = db.get(`${WalletDBEntity}.operations`);
    const foundIndex = operations.findIndex(
        ({ id: operationId }) => operationId === parseInt(id)
    );
    if (foundIndex === -1) {
        res.code(404);
        res.send();
        return;
    }
    const operationToAdd = operations[foundIndex];
    let balance = db.get(`${WalletDBEntity}.balance`);
    if (operationToAdd.type === OpType.IN) {
        balance -= operationToAdd.amount;
    } else if (operationToAdd.type === OpType.OUT) {
        balance += operationToAdd.amount;
    }
    operations.splice(foundIndex, 1);
    db.set(`${WalletDBEntity}.operations`, operations);
    db.set(`${WalletDBEntity}.balance`, balance);
    res.send();
};

const getWalletHandler = function (req, res) {
    const savedWallet =
        db.get(WalletDBEntity) || db.set(WalletDBEntity, initialWalletState);
    res.send(savedWallet);
};

initWallet();
module.exports = function (fastify, opts, done) {
    fastify.delete('/wallet/operation/:id', removeOperationHandler);
    fastify.post('/wallet/operation', addOperationHandler);
    fastify.get('/wallet', getWalletHandler);
    done();
};
