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
            write_title();
        }

    });
}

function write_title()
{
    let work_div = document.getElementById('elem');
    let new_title = document.createElement('p');
    new_title.textContent = "Здравствуйте";
    new_title.className = 'greetings';
    new_title.style.fontSize = 0.3 * 200 + "px"
    work_div.appendChild(new_title);
}
