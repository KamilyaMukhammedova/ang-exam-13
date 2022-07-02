const { I } = inject();

Given('я нахожусь на странице {string}', (page) => {
  I.retry(3);
  switch (page) {
    case 'Регистрация':
      return I.amOnPage('/register');
    case 'Логин':
      return I.amOnPage('/login');
    default:
      return I.amOnPage('/');
  }
});

Given('я ввожу в поля формы:', (table) => {
  table.rows.forEach(row => {
    I.fillField(row.cells[0].value, row.cells[1].value);
  });

  I.wait(2);
});

Given('нажимаю на кнопку формы {string}', (buttonText) => {
  I.click(buttonText, {css: 'form'});
  I.wait(1);
});

Then('я должен увидеть текст {string}', (text) => {
  I.see(text);
  I.amOnPage('/');
  I.wait(1);
});