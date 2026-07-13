console.log("Welcome to Spotify!");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// FIX: Font Awesome's kit script replaces <i> icons with <svg> elements after page load,
// which silently removes any event listeners already attached to the original <i>.
// Solution: attach ONE listener to the stable parent .icons div instead (event delegation),
// so it keeps working no matter what Font Awesome swaps in.
document.querySelector('.icons').addEventListener('click', (e)=>{

    const target = e.target.closest('[id]');
    if(!target) return;

    if(target.id === 'masterPlay'){
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play().catch(err => console.error("PLAY FAILED:", err));
            target.classList.remove('fa-circle-play');
            target.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            target.classList.remove('fa-circle-pause');
            target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    }
    else if(target.id === 'next'){
        if(songIndex>=9){ songIndex = 0; } else { songIndex += 1; }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play().catch(err => console.error("PLAY FAILED:", err));
    }
    else if(target.id === 'previous'){
        if(songIndex<=0){ songIndex = 0; } else { songIndex -= 1; }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play().catch(err => console.error("PLAY FAILED:", err));
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

// Note: song list buttons still use the OLD direct-listener approach here —
// they'll hit the same Font Awesome bug and get fixed in the next commit.
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        document.getElementById('masterPlay').classList.remove('fa-circle-play');
        document.getElementById('masterPlay').classList.add('fa-circle-pause');
    })
})