const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time display
    const timeDisplay = document.querySelector('.time-display');
    //Get lenght of the outline
    const outlineLenght = outline.getTotalLength();
    //Duration
    let fakeDutation = 600;

    outline.style.strokeDasharray = outlineLenght;
    outline.style.strokeDashoffset = outlineLenght;

    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
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
};

app();