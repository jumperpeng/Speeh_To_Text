
const recognition = new webkitSpeechRecognition();
var word_result = null
var state = 1
var score = 0

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
        last_elemet = key
    });

    if(last_elemet == ("level" + state)) $('#start_next').hide();
        

}

//Check Answer
function Check_Answer(result){
    
    $.each(WordData, function (key, value) {
        if(key == ("level" + state)){
            $('#transcription').html = result
            if(value.word === result){
                $('#status').html("ผ่าน")
                score = score + 1
                $('#score').html("Score : " + score)
            }else{
                $('#status').html("ไม่ผ่าน")
                $('#score').html("Score : " + score)
            }
        }
    });
    console.log(score);

}

step_level()

$('#start_next').click(function(){
    state = state + 1
    $('#status').html("ผลลัพธ์")
    $('#transcription').html("")
    step_level()
    $('#start').removeAttr("disabled")
    $('#start_next').attr('disabled', 'disabled')
});

$('#score').html("Score : " + score)

//Record Voice
document.querySelector('#start').addEventListener('click', () => {
    const startBtn = document.querySelector('#start');
    const startNextBtn = document.querySelector('#start_next');

    if (startBtn.innerHTML === "Start") {
        startBtn.innerHTML = "Stop";
    } else {
        startBtn.innerHTML = "Start";
        startBtn.removeAttribute("enabled", "");
        startBtn.setAttribute("disabled", "");
        startNextBtn.removeAttribute("disabled", "");
        startNextBtn.setAttribute("enabled", "");
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




