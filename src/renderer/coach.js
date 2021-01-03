var electron = require('electron');
const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;
const clock = document.querySelector(".clock");
const bountyWrapper = document.querySelector(".bounty-wrapper");
const bountyTime = bountyWrapper.querySelector(".bounty-time")
var bkbTiming = 10;
const audioVolume = .2;
var currentlySmoked = false;
var bountySoundPlayed = false;

const roshWrapper = document.querySelector(".rosh-wrapper");
const aegisExpire = roshWrapper.querySelector(".aegis-expire");
const aegisMin = roshWrapper.querySelector(".aegis-min");
const aegisMax = roshWrapper.querySelector(".aegis-max");

//on page load get the hero object

ipc.on('bkbOn', function(event, args){
    var audio = new Audio('https://www.myinstants.com/media/sounds/super-mario-bros-nes-music-star-theme-cut-mp3.mp3');
    audio.volume = audioVolume;
    audio.play();
    setTimeout(function(){audio.pause()}, bkbTiming*1000);
    if(bkbTiming > 5) {
        bkbTiming--;
    }
    console.log(bkbTiming);
});

ipc.on('gameTime', function(event, args){
    clock.innerHTML = toHHMMSS(args);
    var timeTilBounty = 300 - args%300;
    bountyTime.innerHTML = toHHMMSS(timeTilBounty);
    if(timeTilBounty < 45){
        bountyWrapper.classList.add('active');
        if(!bountySoundPlayed){
            playSound('https://static.wikia.nocookie.net/dota2_gamepedia/images/6/67/Vo_bounty_hunter_bount_win_03.mp3/revision/latest?cb=20201010181341');
            bountySoundPlayed = true;
        }
    }
    if(timeTilBounty == 0 || timeTilBounty > 45) {
        bountyWrapper.classList.remove('active');
        bountySoundPlayed = false;
    }
});

ipc.on('smokedUp', function(event, args){
    if (args) {
        playSound('https://www.myinstants.com/media/sounds/snoop-dogg-smoke-weed-everyday.mp3');
        currentlySmoked = true;
    } else if (currentlySmoked){
        playSound('https://www.myinstants.com/media/sounds/tindeck_1.mp3');
    }
});

function toHHMMSS(secs){
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60
    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

window.onload = function(){
    // console.log(reset);
    // reset.addEventListener('click', function(){resetGame()}, false);
}


function resetGame(){
    console.log("click");
    ipc.send('getGame');
}

function playSound(url){
    var audio = new Audio(url);
    audio.volume = audioVolume;
    audio.play();
}

roshWrapper.addEventListener('click', function() {
    expireTime = 300;
    minTime = 480;
    maxTime = 660;
    roshWrapper.classList.add('active');

    var maxTimer = setInterval(function(){
        maxTime--;
        minTime--;
        expireTime--;
        aegisExpire.innerHTML = "Expire: " + toHHMMSS(expireTime);
        aegisMax.innerHTML = "Max: " + toHHMMSS(maxTime);
        aegisMin.innerHTML = "Min: " + toHHMMSS(minTime);
        console.log(maxTime);
        if(maxTime <= 0)
            clearInterval(maxTimer);
        },1000);
});
  