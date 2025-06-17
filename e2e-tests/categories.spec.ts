// e2e-tests/categories.spec.ts
import { test, expect } from '@playwright/test';

const STRAPI_ADMIN_URL = 'http://localhost:1337/admin';
const ADMIN_EMAIL = 'admin@satc.edu.br';
const ADMIN_PASSWORD = 'welcomeToStrapi123';

test.describe('Gerenciamento de Categorias', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STRAPI_ADMIN_URL);
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL(STRAPI_ADMIN_URL);
    await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible();
  });

  test('deve criar uma nova categoria', async ({ page }) => {
    const categoryName = `Categoria de Teste ${Date.now()}`;

    await page.locator('nav').filter({ hasText: 'Categorias' }).click();
    await page.waitForURL('**/content-manager/collectionType/api::category.category');
    await page.locator('button', { hasText: 'Criar nova entrada' }).click();

    await page.fill('input[name="name"]', categoryName);
    await page.click('button:has-text("Salvar")');

    await expect(page.locator('div[aria-label="Sucesso"]')).toBeVisible();

    
    await page.goto('http://localhost:1337/admin/content-manager/collectionType/api::category.category');
    await expect(page.locator(`text=${categoryName}`)).toBeVisible();
  });

  test('deve editar uma categoria existente', async ({ page }) => {
    const categoryName = `Categoria para Editar ${Date.now()}`;
    await page.locator('nav').filter({ hasText: 'Categorias' }).click();
    await page.waitForURL('**/content-manager/collectionType/api::category.category');
    await page.locator('button', { hasText: 'Criar nova entrada' }).click();
    await page.fill('input[name="name"]', categoryName);
    await page.click('button:has-text("Salvar")');
    await expect(page.locator('div[aria-label="Sucesso"]')).toBeVisible();


    await page.goto('http://localhost:1337/admin/content-manager/collectionType/api::category.category');
    await page.locator(`text=${categoryName}`).click(); 
    const updatedCategoryName = `${categoryName} - Editada`;
    await page.fill('input[name="name"]', updatedCategoryName);
    await page.click('button:has-text("Salvar")');
    await expect(page.locator('div[aria-label="Sucesso"]')).toBeVisible();

 
    await page.goto('http://localhost:1337/admin/content-manager/collectionType/api::category.category');
    await expect(page.locator(`text=${updatedCategoryName}`)).toBeVisible();
  });
});