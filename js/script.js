animate({                               // запускаем всё
    duration: 3000,                     // длительность всей анимации
    timing: function(timeFraction)      // время наростания (как энергично она будет происходить)
    {
        return Math.pow(timeFraction, 5);
    },
    draw: function(progress)            // сама рисовалка
    {
        elem.style.width = progress * 60 + '%';
    }
});

function animate({duration, draw, timing}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction)

        draw(progress);

        if (progress < 1)
        {
            requestAnimationFrame(animate);
        }
        else
        {
            if (document.getElementsByClassName("greetings").length === 0)
            {
                write_greetings();    // если приветствия ещё не было
            }
            else if (!(document.getElementsByClassName("greetings")[0].classList.contains('disable_for_animations')))
            {
                write_farewell();
            }
            else
            {
                
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
    new_title.style.fontSize = "750%";
    new_title.style.bottom = '100%'
    work_div.appendChild(new_title);

    // для отскоков с другой стороны (1-)
    function makeEaseOut(timing) {
        return function(timeFraction) {
            return 1 - timing(1 - timeFraction);
        }
    }

    // для просто отскоков
    function bounce(timeFraction) {
        for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
            }
        }
    }

    let bounceEaseOut = makeEaseOut(bounce);

    animate
    (
        {
            duration: 1000,                     // длительность всей анимации
            timing: bounceEaseOut,      // время наростания (как энергично она будет происходить)
            draw:function(progress)            // сама рисовалка
            {
                // new_title.style.color = 'rgba(0,0,0,' + progress + ')';
                new_title.style.bottom = (1 - progress) * 100 + "%";
                console.log((1 - progress) * 100)
            }
        }
    );

}


function write_farewell()
{
    let work_div = document.getElementById('elem');
    let greetings = document.getElementsByTagName('p')[0];
    // animate
    // (
    //     {
    //         duration: 3000,                     // длительность всей анимации
    //         timing: function(timeFraction)      // время наростания (как энергично она будет происходить)
    //         {
    //             return Math.pow(timeFraction, 5);
    //         },
    //         draw:function(progress)            // сама рисовалка
    //         {
    //             if (1 - progress * 1.8 <= 0)
    //             {
    //                 greetings.classList.add("disable_for_animations");
    //             }
    //             greetings.style.color = 'rgba(0,0,0,' + +(1 - progress * 1.8) + ')';
    //         }
    //     }
    // );
}