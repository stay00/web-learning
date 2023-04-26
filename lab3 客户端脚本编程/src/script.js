function initVideo() {
    let video = document.querySelector('.main-video-container .main-video');
    let progress = document.querySelector('.main-video-container .progress-bar');
    let volume_ctl = document.querySelector('.main-video-container .video-controls .volume .volume-ctl');
    let volume_btn = document.querySelector('.main-video-container .video-controls .volume-btn');
    // video.addEventListener('loadedmetadata', () => {
    //     progress.setAttribute("max", video.duration);
    //     volume_ctl.max = video.volume;
    // });
    progress.setAttribute("max", video.duration);
    video.muted =true;
    volume_ctl.value = video.volume * 100;

    volume_btn.classList.replace('icon-volume1', 'icon-volume0');
    volume_btn.classList.replace('icon-volume2', 'icon-volume0');
}

function swithVideo () {
    let videoList = document.querySelectorAll(".video-list-container .list-item");
    let mainItem = document.querySelector(".main-video-container");
    currentItem = videoList[0];

    function chooseVideo(videoItem) {
        mainItem.querySelector(".main-video").src = videoItem.querySelector(".list-video").src;
        mainItem.querySelector(".main-title").innerHTML = videoItem.querySelector(".list-title").innerHTML;
        videoItem.classList.add("active");
        currentItem.classList.remove("active");
        currentItem = videoItem;
        mainItem.querySelector(".iconfont").classList.replace("icon-zanting", "icon-bofang");
        // initVideo();
        mainItem.querySelector(".main-video").addEventListener("loadedmetadata", initVideo);
    }
    
    videoList.forEach((listItem)=>{
        listItem.addEventListener('click',()=>{chooseVideo(listItem)});
    })
}

function videoControls() {
    let videoContainer = document.querySelector(".main-video-container");
    let video = document.querySelector(".main-video-container .main-video");
    let video_controls = document.querySelector(".video-controls");
    let play = video_controls.querySelector(".play-btn");
    let progress = video_controls.querySelector(".progress-bar");
    let full = video_controls.querySelector(".full-btn");
    let volume = video_controls.querySelector(".volume");
    let volume_btn = volume.querySelector(".volume-btn");
    let volume_ctl = volume.querySelector(".volume-ctl");
    video.controls = false;
    // 播放
    function playVideo() {
        if (video.paused || video.ended) {
            video.play();
            play.classList.replace("icon-bofang", "icon-zanting");
        } else {
            video.pause();
            play.classList.replace("icon-zanting", "icon-bofang");
        }
    }
    play.addEventListener('click', playVideo);
    document.addEventListener('keydown',(e) => {
        if(e.code === 'Spacebar') 
            playVideo();   
    });
    video.addEventListener('click', playVideo);
    // 进度条
    video.addEventListener('timeupdate', () => {
        // if(!progress.getAttribute("max")) 
        //     progress.max = video.duration;
        progress.value = video.currentTime;
    });
    progress.addEventListener('click', (e) => {
        // if(!progress.getAttribute("max")) 
        //     progress.max = video.duration;
        let rect = progress.getBoundingClientRect();
        let pos = (e.pageX - rect.left) / (rect.right - rect.left);
        video.currentTime = video.duration * pos;
        progress.value = video.currentTime;

    });
    document.addEventListener('keydown', (e) => {
        const step = 15;
        if(e.code === 'ArrowLeft') {
            video.currentTime = Math.max(0, video.currentTime - step);
        } else if(e.code === 'ArrowRight') {
            video.currentTime = Math.min(video.duration, video.currentTime + step);
        }
    });
    // 全屏
    function fullScreenHandler() {
        if(document.fullscreenElement !== null) {
            videoContainer.querySelector(".main-title").style.display = "block";
            videoContainer.style.padding = "var(--md)";
            video.style.height = "90%";
            full.classList.replace("icon-exit", "icon-fullscreen");
            // videoContainer.setAttribute("data-fullscreen", false);
            videoContainer.dataset.fullscreen = false;
            document.exitFullscreen();
        } else {
            videoContainer.querySelector(".main-title").style.display = "none";
            videoContainer.style.padding = "0";
            video.style.height = "100%";
            full.classList.replace("icon-fullscreen", "icon-exit");
            // videoContainer.setAttribute("data-fullscreen", true);
            videoContainer.dataset.fullscreen = true;
            videoContainer.requestFullscreen();
        }
        // console.log(!!document.fullscreenElement);
    }
    full.addEventListener('click', fullScreenHandler);
    document.addEventListener("fullscreenchange", () => {
        if(videoContainer.dataset.fullscreen === 'true') {
            videoContainer.dataset.fullscreen = !!document.fullscreenElement;
            // console.log(videoContainer.dataset.fullscreen);
            if(videoContainer.dataset.fullscreen === 'false') {
                videoContainer.querySelector(".main-title").style.display = "block";
                videoContainer.style.padding = "var(--md)";
                video.style.height = "90%";
                full.classList.replace("icon-exit", "icon-fullscreen");
            }
        }
    });

    // 音量
    volume_btn.addEventListener('click', () => {
        if(video.muted === true) {
            if(video.volume < 0.5) 
                volume_btn.classList.replace("icon-volume0", "icon-volume1");
            else
                volume_btn.classList.replace('icon-volume0', 'icon-volume2');
        }
        else {
            volume_btn.classList.replace('icon-volume1', 'icon-volume0');
            volume_btn.classList.replace('icon-volume2', 'icon-volume0');
        }
        video.muted = !video.muted;
    });
    volume_ctl.addEventListener("input", () => {
        video.volume = volume_ctl.value / 100;
        if(video.muted === true) {
            if(video.volume < 0.5) 
                volume_btn.classList.replace("icon-volume0", "icon-volume1");
            else
                volume_btn.classList.replace('icon-volume0', 'icon-volume2');
            video.muted = false;
        } else {
            if(video.volume < 0.5) 
                volume_btn.classList.replace("icon-volume2", "icon-volume1");
            else
                volume_btn.classList.replace('icon-volume1', 'icon-volume2');

        }
    })
    document.addEventListener('keydown', (e) => {
        let step = 0.1;
        if (e.code === 'ArrowUp') 
            video.volume = Math.min(1, video.volume + step);
        else if (e.code === 'ArrowDown')
            video.volume = Math.max(0, video.volume - step);
        if(video.volume > 0) {
            video.muted = false;
            if(video.volume < 0.5) 
                volume_btn.classList.replace("icon-volume0", "icon-volume1");
            else
                volume_btn.classList.replace('icon-volume0', 'icon-volume2');

        }
        volume_ctl.value = video.volume * 100;
    })
}

function hoverBar() {
    let video = document.querySelector(".main-video-container .main-video");
    let volume = document.querySelector(".video-controls .volume");
    let volume_btn = volume.querySelector(".volume-btn");
    let volume_ctl = volume.querySelector(".volume-ctl");
    let speed = document.querySelector(".speed");
    let speed_btn = speed.querySelector(".speed-btn");
    let options = speed.querySelector(".options");
    function hoverDisplay(btn, bar){
        btn.addEventListener('mouseover', () => {
            bar.style.display = 'block';
        });
        btn.addEventListener('mouseout', () => {
            bar.style.display = 'none';
        });
        bar.addEventListener('mouseover', () => {
            bar.style.display = 'block';
        })
        bar.addEventListener('mouseout', () => {
            bar.style.display = 'none';
        });
    }
    hoverDisplay(volume_btn, volume_ctl);
    hoverDisplay(speed_btn, options);
    let option_list = options.querySelectorAll(".option-item");
    option_list.forEach((option_item) => {
        option_item.addEventListener("click", () => {
            video.playbackRate = option_item.dataset.speed;
            options.style.display = 'none';
        })
    });
    
}

function userList() {
    let list_container = document.querySelector(".info-container .profile-list");
    let user_list = document.querySelectorAll(".info-container .profile-list .profile-container");
    let larrow = document.querySelector(".info-container .profile-list .arrow .arrow-btn.icon-xiangzuo");
    let rarrow = document.querySelector(".info-container .profile-list .arrow .arrow-btn.icon-xiangyou");

    let num = user_list.length;
    let arr = [];
    for (i = 0; i < user_list.length; i++) {
        arr.push(user_list[i].querySelector("img").src);
    }
    
    function setShow() {
        const show_num = 5;
        let first = Number(list_container.dataset.first);
        for(i = 0; i < show_num; i++) {
            let img = user_list[i].querySelector("img");
            img.src = arr[(first + i) % num];
        }
    }

    function changeFirst(shift) {
        let first = Number(list_container.dataset.first);
        first = (first + shift) % num;
        if(first < 0)
            first = first + num;
        list_container.dataset.first = first;
    }

    larrow.addEventListener('click', () => {
        changeFirst(-1);
        setShow();
    });
    rarrow.addEventListener('click', () => {
        changeFirst(1);
        setShow();
    });

}

// let video = document.querySelector('.main-video-container .main-video');
// let progress = document.querySelector('.main-video-container .progress-bar');
// video.addEventListener("loadedmetadata", () => {
//     progress.setAttribute("max", video.duration);
//   });

// video.addEventListener("loadedmetadata", initVideo);
initVideo();
swithVideo();
videoControls();
hoverBar();
userList();