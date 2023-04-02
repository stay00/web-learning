(function () {
    let videoList = document.querySelectorAll(".video-list-container .list-item");
    currentItem = videoList[0];

    function playVideo(videoItem) {
        let mainItem = document.querySelector(".main-video-container");
        mainItem.querySelector(".main-video").src = videoItem.querySelector(".list-video").src;
        mainItem.querySelector(".main-title").innerHTML = videoItem.querySelector(".list-title").innerHTML;
        videoItem.classList.add("active");
        currentItem.classList.remove("active");
        currentItem = videoItem;
    }
    
    videoList.forEach((listItem)=>{
        listItem.addEventListener('click',()=>{playVideo(listItem)});
    })
})()