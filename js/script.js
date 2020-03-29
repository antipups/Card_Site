document.body.style.height = document.documentElement.clientHeight - 100 + "px"   // чтоб нормально работал height

animate({                               // запускаем всё
    duration: 3000,                     // длительность всей анимации
    timing: function(timeFraction)      // время наростания (как энергично она будет происходить)
    {
        return Math.pow(timeFraction, 5);
    },
    draw: function(progress)            // сама рисовалка
    {
        elem.style.left = progress * 20 + "%"
        elem.style.width = progress * 60 + '%';
        elem.style.height = progress * 30 + '%';
    }
});

function animate({duration, draw, timing}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction)

        draw(progress);

        if (progress < 1) requestAnimationFrame(animate);
        else
        {
            if (document.getElementsByClassName("greetings").length === 0) write_greetings();    // если приветствия ещё не было
            else if (!(document.getElementsByClassName("greetings")[0].classList.contains('disable_for_animations')))
            {
                setTimeout(write_name, 1000);
            }
        }

    });
}

function write_greetings()
{
    let work_div = document.getElementById('elem');
    let new_title = document.createElement('p');
    new_title.textContent = "Здравствуйте";
    new_title.classList.add('greetings');
    new_title.style.fontSize = (document.documentElement.clientHeight - 100) / 100 * 30 + document.documentElement.clientWidth  / 250 * 60 + "%";
    new_title.style.color = 'rgba(0, 0, 0, 0)'
    work_div.appendChild(new_title);

    animate
    (
        {
            duration: 1000,                     // длительность всей анимации
            timing: function linear(timeFraction) {
                return timeFraction;
            },      // время наростания (как энергично она будет происходить)
            draw:function(progress)            // сама рисовалка
            {
                new_title.style.color = 'rgba(0,0,0,' + progress + ')';
            }
        }
    );

}


function write_name()
{
    let greetings = document.getElementsByTagName('p')[0];
    greetings.classList.add("disable_for_animations");
    greetings.style.color = "white";
    setTimeout(function () {greetings.textContent = "";}, 1000);
    setTimeout(function ()
                      {
                          greetings.style.backgroundColor = "white";
                          greetings.style.color = "black";
                      },
               1000);
    setTimeout(animation_of_write_nickname, 1000, greetings);
}


// написание "Сайт визитка", имитацией пользователем
function animation_of_write_nickname(greetings)
{
    let string = "Сайт-визитка:";
    animate
    (
        {
            duration: 1000,                     // длительность всей анимации
            timing: function linear(timeFraction)
            {
                return timeFraction;
            },      // время наростания (как энергично она будет происходить)
            draw:function(progress)            // сама рисовалка
            {
                greetings.textContent = string.slice(0, progress * 100 / 7.69);
                if (progress === 1) setTimeout(write_nickname, 1000, greetings);
            }
        }
    );
}


// написание никнейма, перематыванием записей, уменьшением сайта визитки и увеличением ника
function write_nickname(greetings)
{
    let work_div = document.getElementById("elem");
    let nickname = document.createElement("p");
    nickname.style.color = "black";
    nickname.textContent = "antipups'a";
    nickname.style.fontSize = "0%"
    work_div.appendChild(nickname)
    animate
    (
        {
            duration: 3000,                     // длительность всей анимации
            timing: function (timeFraction)
            {
                for (let a = 0, b = 1, result; 1; a += b, b /= 2)
                {
                    if (timeFraction >= (7 - 4 * a) / 11)
                    {
                        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
                    }
                }
            },      // время наростания (как энергично она будет происходить)
            draw:function(progress)            // сама рисовалка
            {
                greetings.style.top = progress * -95 + "px";
                if(+greetings.offsetTop <= +work_div.offsetTop)
                {
                    if (+greetings.style.fontSize.slice(0, -1) >= 50)
                    {
                        if ((1 - progress) * 1000 <= (document.documentElement.clientHeight - 100) / 100 * 30 + document.documentElement.clientWidth  / 250 * 60)
                        {
                            greetings.style.fontSize = (1 - progress * 2) * 1000 + "%";
                            nickname.style.fontSize = (progress) * 1000 + "%"
                        }
                    }
                    else greetings.style.fontSize = "0%"
                }
                if (progress === 1) setTimeout(write_describe, 1000, nickname)
            }
        }
    );
}

// начало описания, удаление никнейма и приступание к BODY
function write_describe(nickname)
{
    let work_div = document.getElementById("elem");
    let size_nickname = +nickname.style.fontSize.slice(0, -1);
    let width_div = +work_div.style.width.slice(0, -1);
    animate
    (
        {
            duration: 1000,                     // длительность всей анимации
            timing: function linear(timeFraction)
            {
                return timeFraction;
            },      // время наростания (как энергично она будет происходить)
            draw:function(progress)            // сама рисовалка
            {

                nickname.style.fontSize = (1 - progress) * size_nickname + "%";
                // work_div.style.left = 20 + progress * 30 + "%";
                work_div.style.left = 20 + progress * 80 + "%"
                work_div.style.height = (1 - progress) * 200 + "px";
                work_div.style.width = (1 - progress) * width_div + "%";
                if (progress === 1) work_div.remove()
            }
        }
    );
}




