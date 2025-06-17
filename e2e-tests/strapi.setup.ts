// e2e-tests/strapi.setup.ts
import { test as setup, expect } from '@playwright/test';
import { execSync } from 'child_process';
import waitOn from 'wait-on';

const STRAPI_URL = 'http://localhost:1337';

setup('start Strapi', async () => {
  console.log('Iniciando Strapi para testes...');
  execSync('npm run develop &', { stdio: 'inherit' });

  await waitOn({ resources: [STRAPI_URL], timeout: 60000 });
  console.log('Strapi está online.');

  await new Promise(resolve => setTimeout(resolve, 5000));
});