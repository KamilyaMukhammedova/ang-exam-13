const { I } = inject();

Given('я отмечаю чекбокс', () => {
  I.checkOption('I understand');
  I.wait(1);
});

Given('я добавляю фото', () => {
  I.click('Browse');
  I.wait(1);
  I.click('Загрузки');
  I.wait(1);
  I.click('cafe2.jpg');
  I.wait(1);
  I.click('Открыть');
  I.wait(1);
});