console.log("Welcome to Spotify!");

let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');

let songs = [
    {songName: "Salam-E-Ishq", fliePath: "song/1.mp3", coverpPath: "covers/1.jpg"}
]

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
})

myProgressBar.addEventListener('timeupdate', ()=>{
    console.log('timeupdate')
})