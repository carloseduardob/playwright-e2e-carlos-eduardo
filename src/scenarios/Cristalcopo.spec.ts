import { expect, test } from '@playwright/test';

test.describe('Cristalcopo E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://cristalcopo.com.br/', {
      waitUntil: 'domcontentloaded'
    });
  });

  test('deve permitir recusar cookies', async ({ page }) => {
    const rejectCookies = page.getByRole('button', {
      name: 'Recusar Cookies'
    });

    await expect(rejectCookies).toBeVisible();
    await rejectCookies.click();
    await expect(rejectCookies).toBeHidden();
  });

  test('deve abrir a linha de produtos descartáveis pelo destaque', async ({
    page
  }) => {
    await page.getByRole('button', { name: 'Recusar Cookies' }).click();
    await page.getByRole('link', { name: 'Ver Produtos', exact: true }).click();

    await expect(page).toHaveURL(/\/descartaveis\/$/);
    await expect(
      page.getByRole('heading', { name: 'Descartáveis', exact: true })
    ).toBeVisible();
    await expect(page.getByText('Copos PP', { exact: true })).toBeVisible();
  });

  test('deve filtrar notícias pela categoria Sustentabilidade', async ({
    page
  }) => {
    await page.getByRole('button', { name: 'Recusar Cookies' }).click();
    await page
      .getByRole('link', { name: 'Notícias', exact: true })
      .first()
      .click();

    await expect(page).toHaveURL(/\/noticias\/$/);
    await page
      .locator('.lista-categorias')
      .getByRole('link', { name: 'Sustentabilidade', exact: true })
      .click();

    await expect(page).toHaveURL(/\/category\/sustentabilidade\/$/);
    await expect(
      page.getByRole('heading', {
        name: 'Cristalcopo recebe selo do IMA e reforça compromisso com a sustentabilidade.',
        exact: true
      })
    ).toBeVisible();
  });
});
