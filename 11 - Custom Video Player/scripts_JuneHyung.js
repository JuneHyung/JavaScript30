/* Get out Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer'); // player안에 있는 viewer를 찾기때문에 player.querySelector
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build out functions */
// 1.
function togglePlay() {
    // .play() or .pause()
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
}

// 2.
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon; // 토글 버튼
    // console.log('Update the button');
}

// 3.
function skip() {
    // console.log('skipping!');
    console.timeLog(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); // 현재시간을 추가하거나 뺌. 
}

// 4. 볼륨, 속도 변경.
function handleRangeUpdate() {
    // 두 속성이 출력됨.
    // console.log(this.name);
    // console.log(this.value);

    video[this.name] = this.value;
}

// 5. 영상 진행도
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// 6.
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    
    video.currentTime = scrubTime;
    // console.log(e);
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay); // video화면 클릭
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); 

toggle.addEventListener('click', togglePlay); // play버튼

skipButtons.forEach(button => button.addEventListener('click', skip)); // 버튼들에 skip 추가.

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', scrub);
// true면 scrub false면 scurb X
progress.addEventListener('mousemove', (e)=>mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
