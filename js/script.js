animate({                               // запускаем всё
    duration: 3000,                     // длительность всей анимации
    timing: function(timeFraction)      // время наростания (как энергично она будет происходить)
    {
        return Math.pow(timeFraction, 5);
    },
    draw: function(progress)            // сама рисовалка
    {
        elem.style.width = progress * 100 + '%';
    }
});

function animate({duration, draw, timing}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction)

        draw(progress);

        if (progress < 0.6)
        {
            requestAnimationFrame(animate);
        }
        else
        {
            elem.style.width = '60%';   // костыль?)) нит)))))
            if (document.getElementsByClassName("greetings").length === 0)
            {
                write_title();    // если приветствия ещё не было
            }
        }

    });
}

function write_title()
{
    let work_div = document.getElementById('elem');
    let new_title = document.createElement('p');
    new_title.textContent = "Здравствуйте";
    new_title.classList.add('greetings');
    new_title.style.fontSize = 0.5 * 200 + "px";
    new_title.style.color = 'rgba(0,0,0,0)';
    work_div.appendChild(new_title);

    animate
    (
        {
            duration: 3000,                     // длительность всей анимации
            timing: function(timeFraction)      // время наростания (как энергично она будет происходить)
            {
                return Math.pow(timeFraction, 5);
            },
            draw:function(progress)            // сама рисовалка
            {
                new_title.style.color = 'rgba(0,0,0,' + +(progress * 100) + ')';
            }
        }
    );

}
