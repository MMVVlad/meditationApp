const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get lenght of the outline
    const outlineLenght = outline.getTotalLength();
    //Duration
    let fakeDutation = 600;

    outline.style.strokeDasharray = outlineLenght;
    outline.style.strokeDashoffset = outlineLenght;

    //Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        });
    });

    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select sound
    timeSelect.forEach (option => {
        option.addEventListener('click', function() {
            fakeDutation = this.getAttribute('data-time');
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
            timeDisplay.textContent = `${Math.floor(fakeDutation / 60)}:${Math.floor(fakeDutation % 60)}`;
        });
    });

    //Create a function specific to stop and play the sounds
    const checkPlaying = song => {
        if (song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //We can animated the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDutation - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Animate the circle
        let progress = outlineLenght - (currentTime / fakeDutation) * outlineLenght;
        outline.style.strokeDashoffset = progress;
        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDutation){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };

};

app();