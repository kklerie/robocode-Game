let lime

if(localStorage.getItem("time") !== null) {
    time = parseInt(localStorage.getItem("time"))
} else {
    time = 300
    localStorage.setItem("time", time)
}


let answer = [
    ["гаррі поттер", "harry potter"], 
    ["spongebob", "губка боб"],
    ["пірати", "пірати карибського моря", "pirates of the caribbean", "pirates"],
    ["сімпсони", "simpsons"],
    ["star wars", "зіркові війни"],
    ["lion king", "король лев"],
    ["frozen", "холодне серце"],
    ["shreck", "шрек"],
    ["shreck", "шрек"],
    ["rocky", "роккі"],
    ["indiana jones", "індіана джонс"],
    ["home alone", "один вдома"],
    ["terminator", "термінатор"],
    ["back to the future", "назад в майбутнє"],
    ["ghostbusters", "мисливці за привидами"]
]
let was = []
let progress = 0
let num = Math.floor(1 + Math.random() * 15)

$(document).ready(function () {
    $(".progress").knob({
        "min": 0,
        "max": 5,
        "readOnly": true,
        "displayInput": false,
        "bgColor": "#595656",
        "fgColor": "red",
    })

    $(".time").knob({
        "min": 0,
        "max": 300,
        "readOnly": true,
        "displayInput": false,
        "bgColor": "#595656",
        "fgColor": "red",
    })

    $("#rules").slideUp()

    $(".slideRules").click(function () {
        $("#rules").slideToggle()
    })

    $("#start").click(function () {
        $("#start").css({
            'display': 'none'
        })

        $(".sound, .answer").css({
            'display': 'block'
        })

        startRebus(num)
        startTime()
    })

    

    $("#btnTask1").click(function () {
        console.log(answer[num - 1])
        if (answer[num-1].indexOf($("#inputTask1").val().toLowerCase()) !== -1) {
            alertify.success("Correct answer!")
            $("#inputTask1").val("")
            progress++
            $(".progress").val(progress).trigger("change")
            was.push(num)
            if (progress < 5) {
                do {
                    num = Math.floor(1 + Math.random() * 10)
                } while (was.includes(num))
                startRebus(num)
            } else {
                $(".img, .answer").css({
                    'display': 'none'
                })

                $("#nextTask").css({
                    'display': 'flex'
                })
            }
            } else {
                alertify.error("Wrong answer!")
            }
        })
})

function startRebus(arg) {
    $("#melody").attr("src", `sound/${arg}.mp3`)
}


function startTime() {
    setInterval(function() {
        time = parseInt(localStorage.getItem("time")) - 1
        $(".time").val(time).trigger("change")
        if (time == 0) {
            alertify.error("time is out!")
            setTimeout(() => {window.open("../task1/index.html", "_self", false)}, 2000);
            localStorage.removeItem("time")
        } else if (time > 0) {
            localStorage.setItem("time", time)
        }
    }, 1000)
}