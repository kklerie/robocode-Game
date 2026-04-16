let lime

if (localStorage.getItem("time") !== null) {
    time = parseInt(localStorage.getItem("time"))
} else {
    time = 300
    localStorage.setItem("time", time)
}

let cards = [
    {
        name: "php",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjhQ9s532rngunSSNEyZ5w9qzx9Pf090ISCQ&s",
        id: 1
    },
    {
        name: "python",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKs_IWvJ1MdQgp7xGlhntYGX8dUj0UiG5Xow&s",
        id: 2
    },
    {
        name: "javascript",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXjaii9aL825_kIvRDJ4-U8dxg5qbWaiCdcA&s",
        id: 3
    },
    {
        name: "java",
        img: "https://education.oracle.com/file/general/p-80-java.png",
        id: 4
    },
    {
        name: "c++",
        img: "https://www.vikingsoftware.com/wp-content/uploads/2024/02/C-2.png",
        id: 5
    },
    {
        name: "c#",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShf0LHTk9yRL3wPoqXENgl8Kcmci37yoSSYw&s",
        id: 6
    },
    {
        name: "typescript",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmOm4u60oQR6t9DM-jorQugVTthmHLc_ae_g&s",
        id: 7
    },
    {
        name: "react",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&s",
        id: 8
    },
    {
        name: "html",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1280px-HTML5_logo_and_wordmark.svg.png",
        id: 9
    },
    {
        name: "css",
        img: "https://blog.leonhassan.co.uk/content/images/2019/09/css3.svg",
        id: 10
    },
    {
        name: "sql",
        img: "https://www.ibm.com/content/dam/adobe-cms/instana/media_logo/Azure-SQL-Server-Monitoring.png/_jcr_content/renditions/cq5dam.web.1280.1280.png",
        id: 11
    },
    {
        name: "c",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa1ymvniPx69KalDocpYGb6axjBOTgTGjsFA&s",
        id: 12
    },
]


let was = []
let progress = 0
let num = Math.floor(1 + Math.random() * 15)

let firstCard = null
let secondCard = null

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
        $(".gameBoard").css({
            'display': 'grid'
        })
        fillBoard()
        $(".card").on("click", cardClicked)
        startTime()
    })



    $("#btnTask1").click(function () {
        console.log(answer[num - 1])
        if (answer[num - 1].indexOf($("#inputTask1").val().toLowerCase()) !== -1) {
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


function fillBoard() {
    let board = shuffle([...cards, ...cards])
    for (let i = 0; i < board.length; i++) {
        let cardHTML = `
        <div class="card" data-id="${board[i].id}">
            <div class="front">ROBOCODE</div>
                <div class="back">
                    <img src="${board[i].img}" alt="${board[i].name}">
                </div>
        </div>
        `
        $(".gameBoard").append(cardHTML)
    }
}

function cardClicked(event) {
    if (secondCard || $(this).hasClass("matched")) {
        return
    }

    if (!firstCard) {
        firstCard = $(this)
        firstCard.addClass("flip")
        return
    }

    if (firstCard) {
        secondCard = $(this)
        secondCard.addClass("flip")
        if (firstCard.attr("data-id") === secondCard.attr("data-id")) {
            firstCard.addClass("matched")
            secondCard.addClass("matched")
            firstCard = null
            secondCard = null
            progress++
            $(".progress").val(progress).trigger("change")
            if (progress === 12) {
                alertify.alert("win")
            }
            return
        } else {
            setTimeout(function() {
                firstCard.removeClass("flip")
                secondCard.removeClass("flip")
                firstCard = null
                secondCard = null
            }, 500)
        }
    }
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle
  while (m) {

    // Pick a remaining element
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function startTime() {
    setInterval(function () {
        time = parseInt(localStorage.getItem("time")) - 1
        $(".time").val(time).trigger("change")
        if (time == 0) {
            alertify.error("time is out!")
            setTimeout(() => { window.open("../task1/index.html", "_self", false) }, 2000);
            localStorage.removeItem("time")
        } else if (time > 0) {
            localStorage.setItem("time", time)
        }
    }, 1000)
}