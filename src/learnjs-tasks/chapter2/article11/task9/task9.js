let name = prompt("Кто там?", '');
if (name === 'Админ') {
    let password = prompt('Пароль?', '');
    if (password === 'Я главный') {
        alert( 'Здравствуйте!' );
    } else if (password === '' || password === null) {
        alert( 'Отменено' );
    } else {
        alert( 'Неверный пароль' );
    }
} else if (name === '' || name === null) {
    alert( 'Отменено' );
} else {
    alert( "Я вас не знаю" );
}