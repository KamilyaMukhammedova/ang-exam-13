#language:ru
#noinspection NonAsciiCharacters

Функционал: Вход пользователя
  Для того, чтобы пользоваться сайтом
  Как обычный пользователь
  Я должен иметь возможность зарегистрироваться или войти

  @register
  Сценарий: Регистрация
    Допустим я нахожусь на странице "Регистрация"
    Если я ввожу в поля формы:
      | Email | new_user@mail.ru |
      | Password | 123 |
      | Password repeat | 123 |
      | Display Name | Test |
    И нажимаю на кнопку формы "Register"
    То я должен увидеть текст "Register is successful"

  @login
  Сценарий: Регистрация
    Допустим я нахожусь на странице "Логин"
    Если я ввожу в поля формы:
      | Email | user@mail.ru |
      | Password | 123 |
    И нажимаю на кнопку формы "Login"
    То я должен увидеть текст "Login is successful"
