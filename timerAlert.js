export function alertTimer () {
    const toggleTimerButton = document.querySelector('.toggle__timer');

    const alertSoundUrl = 'src/agradeceu e trocou-girl.mp3';

    let timeInterval;
    let isTimerActive = false;

    function startTimer() {

                const alertSound = new Audio(alertSoundUrl);
                const minutesInput = document.querySelector('.minutesInput').value;
                const secondsInput = document.querySelector('.secondsInput').value;
                const countdounwTime = (parseInt(minutesInput) * 60 + parseInt(secondsInput)) * 1000;

                timeInterval = setInterval(() => {
                    alertSound.currentTime = 0;
                    alertSound.play();
                    console.log("alert init");

        }, countdounwTime);

        console.log("init");
    };

    function stopTimer() {
        clearInterval(timeInterval);
        console.log("stop");
    }

    function toggleTimer() {
        isTimerActive = !isTimerActive;
        toggleTimerButton.textContent = isTimerActive ? 'Stop' : 'Go';
        if (!isTimerActive) {
            stopTimer();
        } else {
            startTimer();
        }
    };

    toggleTimerButton.onclick = () => toggleTimer();
}