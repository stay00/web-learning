function cal() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let op = document.getElementById("op").value;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    op = parseInt(op);
    let answer;
    switch(op) {
        case 1:
            answer = num1 + num2;
            break;
        case 2:
            answer = num1 - num2;
            break;
        case 3:
            answer = num1 * num2;
            break;
        case 4:
            answer = num1 / num2;
            break;
    }
    document.getElementById("res").innerHTML = answer;
}

let field = document.getElementById('num2');
field.addEventListener('change', cal);

