prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 360,
    height: 250,
    image_format: "png",
    png_quality: 90,
});
camera = document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LRr7LR5DH/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function speak(){
    var synth = window.speechSynthesis;

    speak_data = "The first prediction is " + prediction1;
    speak_data2 = "The second prediction is " + prediction2;

    var utterThis = new SpeechSynthesisUtterance(speak_data + speak_data2);

    synth.speak(utterThis);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        //emoji for prediction 1
        if(results[0].label == "yo"){
            document.getElementById("update_emoji").innerHTML = "✌️";
        }
        else if(results[0].label == "thumbs up"){
            document.getElementById("update_emoji").innerHTML = "👍🏼";
        }
        else if(results[0].label == "hi"){
            document.getElementById("update_emoji").innerHTML = "👋🏼";
        }
        else if(results[0].label == "up"){
            document.getElementById("update_emoji").innerHTML = "👆🏻";
        }
        else if(results[0].label == "nice"){
            document.getElementById("update_emoji").innerHTML = "👌🏼";
        }

        //emoji for prediction 2 
        if(results[1].label == "yo"){
            document.getElementById("update_emoji2").innerHTML = "✌️";
        }
        else if(results[1].label == "thumbs up"){
            document.getElementById("update_emoji2").innerHTML = "👍🏼";
        }
        else if(results[1].label == "hi"){
            document.getElementById("update_emoji2").innerHTML = "👋🏼";
        }
        else if(results[1].label == "up"){
            document.getElementById("update_emoji2").innerHTML = "👆🏻";
        }
        else if(results[1].label == "nice"){
            document.getElementById("update_emoji").innerHTML = "👌🏼";
        }
    }
}
