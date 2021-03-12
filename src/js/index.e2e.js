import 'expect-puppeteer';
import { OpType, Endpoints } from './models/enums';
const mockedStructures = require('../../jest/mockedStructures');
const initialGetWalletResponse = {
    status: 200,
    body: JSON.stringify({
        balance: 0,
        operations: [],
    }),
};
let mockGetWalletResponse = initialGetWalletResponse;
const setGetResponse = (operation, success = true) => {
    mockGetWalletResponse = {
        status: success ? 200 : 404,
        body: JSON.stringify({
            balance:
                operation.type === OpType.OUT
                    ? `-${operation.amount}`
                    : operation.amount,
            operations: [
                {
                    ...operation,
                    id: new Date().getTime(),
                    date: new Date().getTime(),
                },
            ],
        }),
    };
};
describe('E2E: testing suite', function () {
    beforeAll(async function () {
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const reqURL = req.url();
            const reqMethod = req.method();
            if (
                reqURL.endsWith(Endpoints.POST_OPERATION) &&
                reqMethod === 'OPTIONS'
            ) {
                return req.respond({
                    status: 204,
                    headers: {
                        'access-control-allow-origin': '*',
                        'access-control-allow-headers': 'content-type',
                        'access-control-allow-methods': 'GET,POST,DELETE',
                    },
                });
            }
            if (
                reqURL.endsWith(Endpoints.POST_OPERATION) &&
                reqMethod === 'POST'
            ) {
                return req.respond({
                    status: 201,
                    headers: {
                        'access-control-allow-origin': '*',
                    },
                });
            }
            if (reqURL.endsWith(Endpoints.GET_WALLET) && reqMethod === 'GET') {
                return req.respond({
                    headers: {
                        'access-control-allow-origin': '*',
                    },
                    contentType: 'application/json',
                    ...mockGetWalletResponse,
                });
            }
            req.continue();
        });
        await page.goto('http://localhost:3000');
    });
    it('No operations found is visible', async function () {
        await page.waitForResponse(
            (res) =>
                res.url().endsWith(Endpoints.GET_WALLET) && res.status() === 200
        );
        const tableContainerElmnt = await page.$('#table-container.no-data');
        expect(tableContainerElmnt).not.toBeNull();
    });
    it('Add operation: open modal, fill form, check table and check balance', async function () {
        const operationToAdd = mockedStructures.outOperation;
        setGetResponse(operationToAdd);
        await expect(page).toClick("button[data-test-id='show-modal-btn']");
        const modalElmnt = await page.$('#modal');
        const modalElmntDisplay = await page.evaluate(
            (elmnt) => elmnt.style.display,
            modalElmnt
        );
        expect(modalElmntDisplay).not.toBe('none');
        await expect(page).toFillForm(
            "form[data-test-id='add-operation-form']",
            {
                amount: operationToAdd.amount.toString(),
                description: operationToAdd.description,
            }
        );
        await expect(page).toClick("button[data-test-id='add-expense-op-btn']");
        await page.waitForResponse(
            (res) =>
                res.url().endsWith(Endpoints.GET_WALLET) && res.status() === 200
        );
        const balanceElmnt = await page.$("[data-test-id='balance-box']");
        const balanceElmntText = await page.evaluate(
            (elmnt) => elmnt.textContent,
            balanceElmnt
        );
        expect(balanceElmntText).toBe('-100');
        const tableElmnt = await page.$("tbody[data-test-id='table-body']");
        const tableElmntChildCount = await page.evaluate(
            (elmnt) => elmnt.children.length,
            tableElmnt
        );
        expect(tableElmntChildCount).toBe(1);
    }, 25000);
    it('Search: find a valid operation', async function () {
        const operationToAdd = mockedStructures.outOperation;
        setGetResponse(operationToAdd);
        await page.reload();
        await expect(page).toFill("input[data-test-id='search-input']", 'bi');
        await expect(page).toClick("button[data-test-id='search-btn-submit']");
        const tableElmnt = await page.$("tbody[data-test-id='table-body']");
        const tableElmntChildCount = await page.evaluate(
            (elmnt) => elmnt.children.length,
            tableElmnt
        );
        expect(tableElmntChildCount).toBe(1);
    }, 25000);
    it('Search: find a not valid operation', async function () {
        const operationToAdd = mockedStructures.outOperation;
        setGetResponse(operationToAdd);
        await page.reload();
        await expect(page).toFill(
            "input[data-test-id='search-input']",
            'salary'
        );
        await expect(page).toClick("button[data-test-id='search-btn-submit']");
        const tableElmnt = await page.$("tbody[data-test-id='table-body']");
        const tableElmntChildCount = await page.evaluate(
            (elmnt) => elmnt.children.length,
            tableElmnt
        );
        expect(tableElmntChildCount).toBe(0);
        await expect(page).toMatch('No operations found');
    }, 25000);
    it('Add income operation: open modal, fill form, check table and check balance', async function () {
        const operationToAdd = mockedStructures.incomeOperation;
        setGetResponse(operationToAdd);
        await expect(page).toClick("button[data-test-id='show-modal-btn']");
        const modalElmnt = await page.$('#modal');
        const modalElmntDisplay = await page.evaluate(
            (elmnt) => elmnt.style.display,
            modalElmnt
        );
        expect(modalElmntDisplay).not.toBe('none');
        await expect(page).toFillForm(
            "form[data-test-id='add-operation-form']",
            {
                amount: operationToAdd.amount.toString(),
                description: operationToAdd.description,
            }
        );
        await expect(page).toClick("button[data-test-id='add-income-op-btn']");
        await page.waitForResponse(
            (res) =>
                res.url().endsWith(Endpoints.GET_WALLET) && res.status() === 200
        );
        const balanceElmnt = await page.$("[data-test-id='balance-box']");
        const balanceElmntText = await page.evaluate(
            (elmnt) => elmnt.textContent,
            balanceElmnt
        );
        expect(balanceElmntText).toBe(
            parseFloat(operationToAdd.amount).toLocaleString()
        );
        const tableElmnt = await page.$("tbody[data-test-id='table-body']");
        const tableElmntChildCount = await page.evaluate(
            (elmnt) => elmnt.children.length,
            tableElmnt
        );
        expect(tableElmntChildCount).toBe(1);
    }, 25000);
    it('Search: reset search after no search results', async function () {
        const operationToAdd = mockedStructures.outOperation;
        setGetResponse(operationToAdd);
        await page.reload();
        await expect(page).toFill(
            "input[data-test-id='search-input']",
            'salary'
        );
        await expect(page).toClick("button[data-test-id='search-btn-submit']");
        const tableElmnt = await page.$("tbody[data-test-id='table-body']");
        const tableElmntChildCount = await page.evaluate(
            (elmnt) => elmnt.children.length,
            tableElmnt
        );
        expect(tableElmntChildCount).toBe(0);
        await expect(page).toMatch('No operations found');
        await expect(page).toClick("button[data-test-id='search-btn-reset']");
        const refreshedTableElmntChildCount = await page.evaluate(
            (elmnt) => elmnt.children.length,
            tableElmnt
        );
        expect(refreshedTableElmntChildCount).toBe(1);
    }, 25000);
});
