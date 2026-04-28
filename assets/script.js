const video = document.getElementById("mhVideo");
const playBtn = document.getElementById("mhPlay");
const playIcon = document.getElementById("mhPlayIcon");
const seek = document.getElementById("mhSeek");
const current = document.getElementById("mhCurrent");
const duration = document.getElementById("mhDuration");
const muteBtn = document.getElementById("mhMute");
const muteIcon = document.getElementById("mhMuteIcon");
const fullBtn = document.getElementById("mhFull");
const back10 = document.getElementById("mhBack10");
const forward10 = document.getElementById("mhForward10");

function formatTime(sec){
  if(isNaN(sec)) return "00:00";
  let m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60);
  return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
}

function togglePlay(){
  if(video.paused){
    video.play();
    playIcon.textContent = "pause";
  }else{
    video.pause();
    playIcon.textContent = "play_arrow";
  }
}

playBtn.onclick = togglePlay;
video.onclick = togglePlay;

video.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(video.duration);
});

video.addEventListener("timeupdate", () => {
  current.textContent = formatTime(video.currentTime);
  seek.value = (video.currentTime / video.duration) * 100 || 0;
});

video.addEventListener("ended", () => {
  playIcon.textContent = "play_arrow";
  seek.value = 0;
});

seek.addEventListener("input", () => {
  video.currentTime = (seek.value / 100) * video.duration;
});

muteBtn.onclick = () => {
  video.muted = !video.muted;
  muteIcon.textContent = video.muted ? "volume_off" : "volume_up";
};

back10.onclick = () => {
  video.currentTime = Math.max(0, video.currentTime - 10);
};

forward10.onclick = () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 10);
};

fullBtn.onclick = () => {
  if(video.requestFullscreen){
    video.requestFullscreen();
  }else if(video.webkitRequestFullscreen){
    video.webkitRequestFullscreen();
  }else if(video.msRequestFullscreen){
    video.msRequestFullscreen();
  }
};

document.addEventListener("keydown", e => {
  if(e.code === "Space"){
    e.preventDefault();
    togglePlay();
  }

  if(e.code === "ArrowRight"){
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
  }

  if(e.code === "ArrowLeft"){
    video.currentTime = Math.max(0, video.currentTime - 10);
  }

  if(e.code === "KeyM"){
    muteBtn.click();
  }

  if(e.code === "KeyF"){
    fullBtn.click();
  }
});