// Маска ввода номера телефона (maskedinput)
$(function ($) {
  $('[name="phone"]').mask("+7(999) 999-99-99");
});

const URL = "http://localhost:3001/messages"; // Сервер куда закидываем данные
                                              // Порт должен быть такой же, как и при запуске сервера
const EMAIL_REGEXP =
  // Регулярка для валидации почты
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

$(document).ready(function () {
  $("#form").on("submit", function (event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем данные из полей формы
    const data = {
      name: $("#fio").val(),
      phone: $("#phone").val(),
      email: $("#email").val(),
      message: $("#message").val(),
    };

    if (
      // Проверка валидации формы
      (data.email.match(EMAIL_REGEXP) || !data.email) &&
      data.name &&
      data.phone
    ) {
      // Отправляем данные на сервер с помощью AJAX
      $.ajax({
        url: URL, // Здесь указываем URL-адрес серверного обработчика
        type: "post",
        data: data,
        success: function () {

          // Обработка успешной отправки сообщения
          $("#fio").val("");
          $("#phone").val("");
          $("#email").val("");
          $("#message").val("");
          alert("Сообшение отправлено успешно!");
        },
        error: function (error) {
          
          // Обработка ошибок при отправке сообщения
          alert("Ошибка при отправке сообщения: ", error);
        },
      });
    } else {
      alert("Не все данные введены корректно");
    }
  });
});
