// e2e-tests/authors.spec.ts
import { test, expect } from '@playwright/test';

const STRAPI_ADMIN_URL = 'http://localhost:1337/admin';
const ADMIN_EMAIL = 'admin@satc.edu.br';
const ADMIN_PASSWORD = 'welcomeToStrapi123';

test.describe('Gerenciamento de Autores', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STRAPI_ADMIN_URL);
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForURL(STRAPI_ADMIN_URL);
    await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible();
  });

  test('deve criar um novo autor', async ({ page }) => {
    const authorName = `Autor de Teste ${Date.now()}`;
    const authorEmail = `autorteste${Date.now()}@example.com`;

    await page.locator('nav').filter({ hasText: 'Autores' }).click(); 
    await page.waitForURL('**/content-manager/collectionType/api::author.author');
    await page.locator('button', { hasText: 'Criar nova entrada' }).click();

    await page.fill('input[name="name"]', authorName);
    await page.fill('input[name="email"]', authorEmail);
    await page.click('button:has-text("Salvar")');

    await expect(page.locator('div[aria-label="Sucesso"]')).toBeVisible();

    await page.goto('http://localhost:1337/admin/content-manager/collectionType/api::author.author');
    await expect(page.locator(`text=${authorName}`)).toBeVisible();
  });

  test('deve editar um autor existente', async ({ page }) => {
    const authorName = `Autor para Editar ${Date.now()}`;
    const authorEmail = `editautor${Date.now()}@example.com`;
    await page.locator('nav').filter({ hasText: 'Autores' }).click();
    await page.waitForURL('**/content-manager/collectionType/api::author.author');
    await page.locator('button', { hasText: 'Criar nova entrada' }).click();
    await page.fill('input[name="name"]', authorName);
    await page.fill('input[name="email"]', authorEmail);
    await page.click('button:has-text("Salvar")');
    await expect(page.locator('div[aria-label="Sucesso"]')).toBeVisible();

   
    await page.goto('http://localhost:1337/admin/content-manager/collectionType/api::author.author');
    await page.locator(`text=${authorName}`).click();
    const updatedAuthorName = `${authorName} - Editado`;
    await page.fill('input[name="name"]', updatedAuthorName);
    await page.click('button:has-text("Salvar")');
    await expect(page.locator('div[aria-label="Sucesso"]')).toBeVisible();

   
    await page.goto('http://localhost:1337/admin/content-manager/collectionType/api::author.author');
    await expect(page.locator(`text=${updatedAuthorName}`)).toBeVisible();
  });
});