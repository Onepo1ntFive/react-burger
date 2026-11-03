import { expect, test } from '@playwright/test';

import type { Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('accessToken', 'test-token'); // чтобы checkUserAuth пошёл в сеть
    localStorage.setItem('refreshToken', 'test-refresh');
  });

  await page.routeFromHAR('tests/hars/api.har', {
    url: /new-stellarburgers\.education-services\.ru\/api\//,
    notFound: 'abort',
  });

  await page.goto('/');
});

// необходимый префил
const fillConstructor = async (page: Page): Promise<void> => {
  const dropToContainer = page.getByTestId('constructor-drop-to-container');
  const corner = { sourcePosition: { x: 3, y: 3 } };

  await page
    .getByTestId('constructor-is-drug-container-bun-0')
    .dragTo(dropToContainer, corner);
  await page
    .getByTestId('constructor-is-drug-container-main-0')
    .dragTo(dropToContainer, corner);
};

test('Ингридиенты перетаскиваются ', async ({ page }) => {
  const constructorDropToContainer = page.getByTestId('constructor-drop-to-container');
  const corner = { sourcePosition: { x: 3, y: 3 } }; // тащим за краешек, иначе в хроме может потащить за картинку или текст

  const constructorItems = constructorDropToContainer.locator(
    '.constructor-element .constructor-element__text'
  );
  await expect(constructorItems.nth(0)).toContainText('Выберите булки');
  await expect(constructorItems.nth(1)).toContainText('Выберите начинки');
  await expect(constructorItems.nth(2)).toContainText('Выберите булки');

  await page
    .getByTestId('constructor-is-drug-container-bun-0')
    .dragTo(constructorDropToContainer, corner);
  await page
    .getByTestId('constructor-is-drug-container-main-1')
    .dragTo(constructorDropToContainer, corner);
  await page
    .getByTestId('constructor-is-drug-container-main-2')
    .dragTo(constructorDropToContainer, corner);

  await expect(constructorItems.nth(0)).toContainText('Краторная булка N-200i (верх)');
  await expect(constructorItems.nth(1)).toContainText('Плоды Фалленианского дерева');
  await expect(constructorItems.nth(2)).toContainText(
    'Кристаллы марсианских альфа-сахаридов'
  );
  await expect(constructorItems.nth(3)).toContainText('Краторная булка N-200i (низ)');
});

test('Модальное окно с деталями ингридиента открывается', async ({ page }) => {
  const constructorIngredientLink = page.getByTestId(
    'constructor-is-drug-container-main-0'
  );
  await constructorIngredientLink.click();
  const constructorModalIngredientName = page.getByTestId(
    'constructor-modal-ingredient-name'
  );
  await expect(constructorModalIngredientName).toContainText(
    'Хрустящие минеральные кольца'
  );
});

test('Модальное окно с деталями заказа отображается', async ({ page }) => {
  const modal = page.locator('#modals');

  await fillConstructor(page);

  await expect(modal.getByText('Ваш заказ начали готовить')).toHaveCount(0);

  await page.getByTestId('order-submit').click();

  await expect(modal.getByText('4242')).toBeVisible();
  await expect(modal.getByText('Тестовый заказ')).toBeVisible();
  await expect(modal.getByText('Ваш заказ начали готовить')).toBeVisible();
  await expect(
    modal.getByText('Дождитесь готовности на орбитальной станции')
  ).toBeVisible();
});

test('Модальное окно закрывается по кнопке закрытия', async ({ page }) => {
  const modal = page.locator('#modals');

  await fillConstructor(page);
  await page.getByTestId('order-submit').click();

  await expect(modal.getByText('Ваш заказ начали готовить')).toBeVisible();

  const closeButton = modal.locator('[class*="modal_close"]');
  await expect(closeButton).toBeVisible();
  await closeButton.click();

  await expect(modal.getByText('Ваш заказ начали готовить')).toHaveCount(0);
  await expect(modal.getByText('4242')).toHaveCount(0);
});
