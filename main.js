
// let texts = document.querySelector(".tes");

// const recognition = new webkitSpeechRecognition();
// recognition.lang = "th-TH";
// recognition.continuous = true;
// recognition.interimResults = true;

// let p = document.createElement("p");
// const element = document.getElementById("demo");

// var word = ["กล้วยหอมการบ้าน"];

// recognition.addEventListener("result", function (event) {
//     const text = Array.from(event.results)
//         .map((result) => result[0])
//         .map((result) => result.transcript)
//         .join(" ");

//     console.log(text);
//     p.innerText = text;
//     texts.appendChild(p);
// });

// recognition.start();


const recognition = new webkitSpeechRecognition();
var word_result = null
var state = 1

//Get word
var WordData = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'exercises.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

//Get level
function step_level(){
    
    $.each(WordData, function (key, value) {
        if(key == ("level" + state)){
            $('#Level').html(value.level)
            $('#word').html(value.word)
        }
    });

}

//Check Answer
function Check_Answer(result){

    $.each(WordData, function (key, value) {
        if(key == ("level" + state)){
            if(value.word === result){
                $('#status').html("ผ่าน")
            }else{
                $('#status').html("ไม่ผ่าน")
            }
        }
    });

}

step_level()

$('#start_next').click(function(){
    state = state + 1
    $('#status').html("ผลลัพธ์")
    $('#transcription').html("")
    step_level()
});

//Record Voice
document.querySelector('#start').addEventListener('click', () => {
    const startBtn = document.querySelector('#start');

    if (startBtn.innerHTML === "Start") {
        startBtn.innerHTML = "Stop";
    } else {
        startBtn.innerHTML = "Start";
    }
    recognition.lang = "th-TH";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        const accumulatedResult = [];
        for (const result of event.results) accumulatedResult.push(`${result[0].transcript}`);

        document.querySelector('#transcription').innerHTML = accumulatedResult;
    };

    if (startBtn.classList.contains('listening')) {
        recognition.stop();

        word_result = document.querySelector('#transcription').innerHTML
        Check_Answer(word_result)

    } else recognition.start();

    startBtn.classList.toggle('listening');
});




