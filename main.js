var divButtons = document.querySelectorAll("div button");
var op1 = document.getElementById("op1");
var op2 = document.getElementById("op2");
var sign = document.getElementById("sign");
var written = document.getElementById('written');
var output = document.getElementById('output');
var number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var writtenString;

divButtons.forEach(button => {
  button.addEventListener("click", function() {
    console.log(this.id);
    // Writing to screen
      
        if (this.id !== "clear" && this.id !== "backspace") {
        
            if (written.textContent === '') {
                if (op1.textContent === "" && number.includes(this.id) && sign.textContent === '') {
                    op1.textContent = this.id;
                } else if (op1.textContent !== "" && number.includes(this.id) && sign.textContent === '') {
                    op1.textContent = op1.textContent + this.id;
                }
            }
      
            if (
              (this.id === "+" ||
              this.id === "-" ||
              this.id === "*" ||
              this.id === "/" || this.id === '%') && op1.textContent !== ''
            ) {
              sign.textContent = this.id;
            }
      
            if (sign.textContent !== "") {
              if (op2.textContent === "" && number.includes(this.id)) {
                op2.textContent = this.id;
              } else if (op2.textContent !== "" && number.includes(this.id)) {
                op2.textContent = op2.textContent + this.id;
              }
            }
          } else if (this.id === 'clear') {
              op1.textContent = sign.textContent = op2.textContent = written.textContent = output.textContent = '';
          } else if (this.id === 'backspace') {
              if (op1.textContent !== '' && sign.textContent === '' && op2.textContent === '') {
                  op1.textContent = op1.textContent.slice(0, -1);
              } else if (op1.textContent !== '' && sign.textContent !== '' && op2.textContent === '') {
                  sign.textContent = '';
              } else if (op1.textContent !== '' && sign.textContent !== '' && op2.textContent !== '') {
                  op2.textContent = op2.textContent.slice(0, -1);
              }
      }
      

      if (this.id === 'equal') {
        if (op1.textContent !== '' && sign.textContent !== '' && op2.textContent !== '') {
          writtenString = op1.textContent + ' ' + sign.textContent + ' ' + op2.textContent + ' ' + '=';
            written.textContent = writtenString;
            let num1 = op1.textContent; let num2 = op2.textContent;
            let actualSign = sign.textContent;
            op1.textContent = sign.textContent = op2.textContent = '';   

          //   calculating the result
            switch (actualSign) {
                case '+':
                    output.textContent = parseInt(num1) + parseInt(num2);
                    break;
                case '-':
                    output.textContent = parseInt(num1) - parseInt(num2);
                    break;
                case '*':
                    output.textContent = parseInt(num1) * parseInt(num2);
                    break;
                case '/':
                    output.textContent = parseInt(num1) / parseInt(num2);
                    break;
                case '%':
                    output.textContent = parseInt(num1) % parseInt(num2);
                    break;
            }
            if (output.textContent.length >= 12) {
                output.classList.add('.output2');
                output.classList.remove('output');
            }
            
      }
    }
      
      
  });
});
