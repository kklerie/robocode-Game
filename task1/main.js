let answer = ["яблуко", "груша", "банан", "ківі", "школа", "зошит", "собака", "кіт", "риба", "машина"]
let was = []
let progress = 0
let num = Math.floor(1 + Math.random() * 10)

$(document).ready(function () {
    $(".progress").knob({
        "min": 0,
        "max": 5,
        "readOnly": true,
        "displayInput": false,
        "bgColor": "#595656",
        "fgColor": "red",
    })

    $("#rules").slideUp()

    $(".slideRules").click(function () {
        $("#rules").slideToggle()
    })

    startRebus(num)

    $("#btnTask1").click(function () {
        console.log(answer[num - 1])
        if ($("#inputTask1").val().toLowerCase() == answer[num - 1]) {
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
    $("#picture").attr("src", `rebus/${arg}.png`)
}