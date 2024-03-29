const resultEl = document.querySelector("#result");
const lengthEl = document.querySelector("#length");
const lowerCaseEl = document.querySelector("#lowercase");
const upperCaseEl = document.querySelector("#uppercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const generatelEl = document.querySelector("#generate");
const clipboardEl = document.querySelector("#clipboard");

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol
};


clipboardEl.addEventListener('click', () => {
const textarea = document.createElement('textarea')
const password = resultEl.innerText

if(!password){return}

textarea.value = password
document.body.appendChild(textarea)
textarea.select()
document.execCommand('copy')
textarea.remove()
alert('Password copied to the clipboard!')

})


generatelEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowerCaseEl.checked;
  const hasUpper = upperCaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
  
});



function generatePassword(upper, lower,  number, symbol, length) {
  let generatedPassword = ''
  const typesCount = upper + lower  + number + symbol
  const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0])
  
  if(typesCount === 0) {
      return ''
  }

  for(let i = 0; i < length; i += typesCount) {
      typesArr.forEach(type => {
          const funcName = Object.keys(type)[0]
          generatedPassword += randomFunc[funcName]()
      })
  }

  const finalPassword = generatedPassword.slice(0, length)

  return finalPassword
}



function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*()_+;:""?/<>`~[]{},.|-';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
