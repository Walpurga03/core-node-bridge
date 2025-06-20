import { test, expect, type Page } from '@playwright/test';

test.describe('Blockchain Commands Smoke Test', () => {
  // KORREKTUR: Timeout für die gesamte Test-Suite erhöhen, da die Schleife lange dauert.
  test.setTimeout(120000); // 2 Minuten

  let page: Page;

  // Vor allen Tests in dieser Datei: Browser öffnen und zur Seite navigieren
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    // Stellen Sie sicher, dass der Port zu Ihrem Vite-Dev-Server passt (oft 5173)
    await page.goto('http://localhost:5173/');
    await expect(page.getByRole('heading', { name: 'Bitcoin Core Node Bridge' })).toBeVisible();
  });

  // Nach allen Tests: Seite schließen
  test.afterAll(async () => {
    await page.close();
  });

  test('sollte zur Blockchain-Kategorie navigieren und jeden Befehl testen', async () => {
    // 1. Zur Kategorie "Blockchain" navigieren
    await page.getByRole('button', { name: 'Blockchain' }).click();
    await expect(page.getByRole('heading', { name: 'Blockchain' })).toBeVisible();

    // 2. Alle Befehls-Buttons in der Kategorie finden (jetzt mit data-testid)
    const commandMenu = page.getByTestId('command-menu');
    await expect(commandMenu).toBeVisible(); // Warten, bis der Container sichtbar ist
    const commandButtons = commandMenu.getByRole('button');
    const count = await commandButtons.count();
    
    expect(count).toBeGreaterThan(30); 
    console.log(`Gefundene Befehle in der Kategorie Blockchain: ${count}`);

    // 3. Schleife durch jeden Befehl
    for (let i = 0; i < count; i++) {
      // Die Buttons müssen in jeder Iteration neu gefunden werden (mit dem neuen Selektor)
      const button = page.getByTestId('command-menu').getByRole('button').nth(i);
      const commandName = await button.textContent();
      
      if (!commandName) {
        throw new Error(`Button bei Index ${i} hat keinen Text.`);
      }

      console.log(`-> Teste Navigation zu: ${commandName}`);

      // Klicke auf den Befehls-Button
      await button.click();

      // Überprüfe, ob die Detailseite des Befehls geladen wurde
      await expect(page.getByRole('heading', { name: commandName })).toBeVisible({ timeout: 10000 });
      
      // Überprüfe, ob die wichtigen UI-Elemente vorhanden sind
      await expect(page.getByRole('button', { name: 'Mehr Infos' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Abfragen' })).toBeVisible();

      // Gehe zurück zur Kategorie-Übersicht
      // KORREKTUR: Selektor robuster machen, falls der Pfeil Probleme bereitet.
      await page.getByRole('button', { name: /Zurück/ }).click();

      // Überprüfe, ob wir wieder in der Kategorie-Ansicht sind
      await expect(page.getByRole('heading', { name: 'Blockchain' })).toBeVisible();
    }
  });
});