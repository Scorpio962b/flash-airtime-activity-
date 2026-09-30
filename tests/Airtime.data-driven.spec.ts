import { test, expect } from '@playwright/test';
import type { AirtimeCase } from './types/Airtime';
import airtime from '../testdata/airtime-activity.json'
import { Network } from 'node:inspector/promises';

const cases = airtime as AirtimeCase[];

test.describe('Airtime purchase - data-driven', () => { 
 test.beforeEach(async ({ page }) => {
    await page.goto('/airtime');
 });
 for (const tc of cases){
    test(`${tc.caseId}: ${tc.scenario}`, async ({page}) => {
    
        await page.locator('#network').selectOption({ value: tc.purchase.network });
        await page.getByRole('textbox', { name: 'Cellphone number' }).fill(tc.purchase.cellphone);
        await page.getByRole('textbox', { name: 'Airtime amount (R)' }).fill(tc.purchase.amount);
        await page.getByRole('button', { name: 'Buy airtime' }).click();

        const outcome = page.getByTestId('airtime-result');
        await expect(outcome).toHaveAttribute('data-result', tc.expect.outcome);
        await expect(outcome).toHaveText(tc.expect.message);
        await expect(page.getByTestId('balance')).toHaveText(tc.expect.walletBalance);
    })
 }
});