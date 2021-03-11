import { OpType, Endpoints } from './models/enums';
import ConfigService from './services/ConfigService';
import axios from 'axios';

/**
 * Check if an operation is valid based on amount, description and type.
 * @name isValidOperation
 * @function
 * @param {Operation} op - Operation to check
 * @return {boolean}
 */
const isValidOperation = (op) =>
    op?.description &&
    parseFloat(op?.amount) > 0 &&
    typeof OpType[op?.type] !== 'undefined';
/**
 * Get the saved wallet.
 * @name getWallet
 * @function
 * @return {WalletInterface}
 */
async function getWallet() {
    const { data: wallet } = await axios.get(
        `${ConfigService.getApiBaseEndpoint()}/${Endpoints.GET_WALLET}`
    );
    if (!wallet) {
        return {
            balance: 0,
            operations: [],
        };
    }
    return wallet;
}
const doCreateOperation = (operation) =>
    axios.post(
        `${ConfigService.getApiBaseEndpoint()}/${Endpoints.POST_OPERATION}`,
        operation
    );
const doRemoveOperation = (operationID) =>
    axios.delete(
        `${ConfigService.getApiBaseEndpoint()}/${
            Endpoints.POST_OPERATION
        }/${operationID}`
    );

export { getWallet, isValidOperation, doCreateOperation, doRemoveOperation };
