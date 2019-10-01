    const timer = document.getElementById('time-goes-here')
    const points = document.getElementById('points-go-here')

    countDownTimer();
    
//Timer for game play


    function countDownTimer() {
        var i = 10;
        var ticker = setInterval(function () {
            timer.innerHTML = i;
            if (i === 0) {
                clearInterval(ticker);
            }
            else   {
                    i--;
                    }
                }, 1000);

    };
