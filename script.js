var currentClass = ""

var audioPlaying = false;

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add("animated", animationName)

    function handleAnimationEnd() {
        node.classList.remove("animated", animationName)
        node.removeEventListener("animationend", handleAnimationEnd)
    
        if (typeof callback === "function") callback()
    }

    node.addEventListener("animationend", handleAnimationEnd)
}



function getImage(objectClass) {
    if(objectClass == "elephant") {
        return "elephant_overlay.png"
    } else if(objectClass == "cow") {
        return "cow_overlay.png"
    } else if(objectClass == "sheep") {
        return "sheep_overlay.png"
    } else if(objectClass == "horse") {
        return "horse_overlay.png"
    } else if(objectClass == "bird") {
        return "bird_overlay.png"
    } else if(objectClass == "cat") {
        return "cat_overlay.png"
    } else if(objectClass == "dog") {
        return "dog_overlay.png"
    } else if(objectClass == "bear") {
        return "bear_overlay.png"
    } else if(objectClass == "zebra") {
        return "zebra_overlay.png"
    } else if(objectClass == "giraffe") {
        return "giraffe_overlay.png"
    } else if(objectClass == "person") {
        return "person_overlay.png"
    }

    else {
        return ""
    }
}

function getSound(objectClass) {
    if(objectClass == "elephant") {
        return "elephant.mp3"
    } else if(objectClass == "cow") {
        return "cow.mp3"
    } else if(objectClass == "sheep") {
        return "sheep.mp3"
    } else if(objectClass == "horse") {
        return "horse.mp3"
    } else if(objectClass == "bird") {
        return "bird.mp3"
    } else if(objectClass == "cat") {
        return "cat.mp3"
    } else if(objectClass == "dog") {
        return "dog.mp3"
    } else if(objectClass == "bear") {
        return "bear.mp3"
    } else if(objectClass == "zebra") {
        return "zebra.mp3"
    } else if(objectClass == "giraffe") {
        return "giraffe.mp3"
    } else if(objectClass == "person") {
        return "person.mp3"
    }

    else {
        return ""
    }
}

function classifyAndNext(model) {
	model.detect(video).then(pred => {
        pred = pred.map(x => x.class)
        pred = pred.filter((value, index, arr) => arr.indexOf(value) == index)

        var newClass = ""

        if(pred.includes("elephant")) {
            newClass = "elephant"
        } else if(pred.includes("cow")) {
            newClass = "cow"
        } else if(pred.includes("sheep")) {
            newClass = "sheep"
        } else if(pred.includes("horse")) {
            newClass = "horse"
        } else if(pred.includes("bird")) {
            newClass = "bird"
        } else if(pred.includes("cat")) {
            newClass = "cat"
        } else if(pred.includes("dog")) {
            newClass = "dog"
        } else if(pred.includes("bear")) {
            newClass = "bear"
        } else if(pred.includes("zebra")) {
            newClass = "zebra"
        } else if(pred.includes("giraffe")) {
            newClass = "giraffe"
        } else if(pred.includes("person")) {
            newClass = "person"
        }

        else {
            newClass = ""
        } 

        if(currentClass != newClass) {
            if(currentClass == "") {
                // new card coming in
                document.getElementById("overlay").src = getImage(newClass)
                animateCSS("#overlay", "slideInUp")
            }
            else if(newClass == "") {
                // card sliding out
                document.getElementById("overlay").src = ""
            }
            else {
                // change from one card to another
                document.getElementById("overlay").src = getImage(newClass)
            }

            var sound = getSound(newClass)
            if(sound && sound.length > 0 && !audioPlaying) {
                audioPlaying = true
                var audio = new Audio(sound)
                audio.play()

                setTimeout(function() { audioPlaying = false }, 3000)
            }

            currentClass = newClass
        }


		setTimeout(function() {
			classifyAndNext(model)
		}, 100)
	});
}




var video = document.getElementById("video");

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

	navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } } }).then(function(stream) {
		video.srcObject = stream;
		video.play();
	});

    cocoSsd.load().then(model => {
        classifyAndNext(model)
        alert("Loaded")
    });

} else{
    alert ("Camera not available")
}

