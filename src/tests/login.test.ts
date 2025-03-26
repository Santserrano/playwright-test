import { test, expect, chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || '';
const VALID_USER = process.env.USUARIO || '';
const VALID_PASSWORD = process.env.PASSWORD || '';

test.describe('Test automatizado con playwright', () => {
  test('Ingreso valido con credenciales en .env', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    
    await page.goto(BASE_URL);
    await page.waitForSelector('input[placeholder="Usuario"]');
    await page.fill('input[placeholder="Usuario"]', VALID_USER);
    await page.fill('input[placeholder="Contraseña"]', VALID_PASSWORD);
    await page.click('input[type="image"]');
    
    // redireccion
    await expect(page).toHaveURL(`${BASE_URL}/Proteccion/Inicio.aspx`);
    
    // etiqueta header
    await expect(page.locator('#ctl00_Label1')).toHaveText('Serrano Ramírez, Santiago Norberto - Ingeniería en Sistemas de Información(R. M. Nº 556/17) - Central');
    
    await browser.close();
  });

  test('Ingreso invalido con credencial 666', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    
    await page.goto(BASE_URL);
    await page.waitForSelector('input[placeholder="Usuario"]');
    await page.fill('input[placeholder="Usuario"]', '666');
    await page.fill('input[placeholder="Contraseña"]', 'demo');
    await page.click('input[type="image"]');
    
    // verificacion state
    await page.waitForSelector('#ctl00_ContentPlaceHolder1_Label2.style83', { state: 'visible' });
    
    // span
    await expect(page.locator('#ctl00_ContentPlaceHolder1_Label2.style83')).toHaveText('La combinación de usuario y clave no coincide');
    
    await browser.close();
  });
});