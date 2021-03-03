import 'expect-puppeteer';

describe('E2E: testing suite', function () {
    beforeAll(async function () {
        await page.goto('http://localhost:3001');
    });
    it('No operations found is shown', async function () {
        await expect(page).toMatch('No operations found');
    });
    it('Add operation: open modal, fill form, check table and check balance', async function () {
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
                amount: '100',
                description: 'Bill',
            }
        );
        await expect(page).toClick("button[data-test-id='add-expense-op-btn']");
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
});
