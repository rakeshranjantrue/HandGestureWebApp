prediction=""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

onsole.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jqr_pIxr3/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}


function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "This is literally beautiful 👌";
        }
        if(results[0].label == "Best"){
            document.getElementById("result_emoji").innerHTML = "&#128077";
            document.getElementById("quote").innerHTML = "Looking good! 👍";
        }
        if(results[0].label == "Victory"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "Oh Yes! Argentina won against France. ✌";
        }
        if(results[0].label == "Dislike"){
            document.getElementById("result_emoji").innerHTML = "&#128078;";
            document.getElementById("quote").innerHTML = "Nah! This is not good. 👎";
        }
    }
}