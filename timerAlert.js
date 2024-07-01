export function alertTimer () {
    const toggleTimerButton = document.querySelector('.toggle__timer');

    const alertSoundUrl = 'src/agradeceu e trocou-girl.mp3';

    let timeInterval;
    let isTimerActive = false;

    function startTimer() {

                const alertSound = new Audio(alertSoundUrl);
                const timeInput = document.querySelector('.timeInput').value;
                const countdounwTime = parseInt(timeInput) * 1000;

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