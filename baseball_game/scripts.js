const MAX_RANDOM_NUMBER = 9;
const MIN_RANDOM_NUMBER = 1;
const $inputNumber = document.querySelector('.input-number');
const $gameTable = document.querySelector(".game-table");

let answer;

function inputDigit(numberOfDigit){
    $gameTable.innerHTML = "<tr><td>순서</td><td>숫자</td><td>결과</td></tr>";
    if(numberOfDigit === "3자리"){
        answer = randomNumber(3);
    } else if(numberOfDigit === "4자리"){
        answer = randomNumber(4);
    } else if(numberOfDigit === "5자리"){
        answer = randomNumber(5);
    }
}

function randomNumber(numberOfDigit){
    let result = 0;
    let existingNumbers = [];
    for (step = 0; step < numberOfDigit; step++) {
        let randomNumber = Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER) + MIN_RANDOM_NUMBER);
        while (existingNumbers.includes(randomNumber)){
            randomNumber = Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER) + MIN_RANDOM_NUMBER);
        }
        existingNumbers.push(randomNumber);
    }

    let weight = 1;
    for(j = 0; j < numberOfDigit; j++){
        result += existingNumbers[j] * weight;
        weight *= 10;
    }

    console.log(result);
    return result;
}

let index = 1;
function addValue(){
    const newRow = $gameTable.insertRow();
    const pitchResult = checkBallAndStrike(answer);
    const convertedAnswer = answer.toString();

    let isValid = 0;
    if($inputNumber.value.length === convertedAnswer.length){
        for(let i = 0; i < $inputNumber.value.length; i++){
            for(let j = 0; j < $inputNumber.value.length; j++){
                if(i !== j){
                    if($inputNumber.value[i] === $inputNumber.value[j]){
                        isValid = 1;
                    }
                }
            }
        }
        if(isValid === 0){
            const turn = newRow.insertCell(0);
            const number = newRow.insertCell(1);
            const result = newRow.insertCell(2);
            turn.innerText = `${index++}`;
            number.innerText = `${$inputNumber.value}`
            if(pitchResult[1] === convertedAnswer.length){
                result.innerText = `O.K.`;
            } else{
                result.innerText = `B: ${pitchResult[0]}, S: ${pitchResult[1]}`;
            }
        } else{
            alert("올바르지 않은 값입니다.");
        }
       
    } else{
        alert("올바르지 않은 값입니다.");
    }

}

function checkBallAndStrike(answer){
    const convertedAnswer = answer.toString();
    const convertedInputNumber = $inputNumber.value.toString();
    let k = 0;
    let score = [0, 0];
    while(k < convertedAnswer.length){
        if(convertedAnswer[k] === convertedInputNumber[k]){
            score[1] += 1;
        } else{
            for(let item of convertedAnswer){
                if(item === convertedInputNumber[k]){
                    score[0] += 1;
                }
            }
        }
        k += 1;
    }
    return score;
}