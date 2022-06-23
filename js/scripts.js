function run() {
    // Команда для компиляции на удаленном сервере
    var cmd = "g++ -Wall main.cpp -o main_prog && echo 'Компиляция: ЗАВЕРШЕНА.\n"
        + "Результат программы:\n' && ./main_prog && echo \"\nКод: $?\"";

    var output = $("#output");
    output.text('');
    var to_compile = {
        "src": code.getValue(),
        "cmd": cmd,
    };

    output.text("Выполнение программы...");

    $.ajax({
        url: "http://coliru.stacked-crooked.com/compile",
        type: "POST",
        data: JSON.stringify(to_compile),
        contentType:"text/plain; charset=utf-8",
        dataType: "text"
    }).done(function(data) {
        output.text(data);
    }).fail(function(data) {
        output.text("Server error: " + data);
    });
};