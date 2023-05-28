const form = document.querySelector("form"),
uploadFile = form.querySelector(".upload-file"),
uploadList = document.querySelector(".upload-list");
form.addEventListener("click", () => {
    uploadFile.click();
});
// form.onsubmit = () => { return false };
uploadFile.addEventListener('change', (e) => {
    // form.submit();
    files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let fileName = file['name'];
        if (file) {
            if (fileName.length >= 12) {
                let tmp = fileName.split(".");
                fileName = tmp[0].substring(0, 12) + "... ." + tmp[tmp.length-1];
            }
            upload(fileName);
        }
    }
});
function upload(name) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload');
    let formData = new FormData(form);
    let row = `<div class="row">
                    <span class="pic material-symbols-outlined">
                        description
                    </span>
                    <div class="content">
                        <div class="details">
                            <span class="name">${name}</span>
                            <span class="percent">0%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                    </div>
                </div>`;
    uploadList.insertAdjacentHTML("afterbegin", row);
    let firstRow = document.querySelector('.upload-list .row');
    firstRow.querySelector('.progress').style.width = '0%';
    xhr.upload.addEventListener('progress', function(event) {
        // 计算上传进度
        let percent = Math.round((event.loaded / event.total) * 100);
        console.log(percent + '% uploaded');
        firstRow.querySelector('.progress').style.width = `${percent}%`;
        let percentContent = firstRow.querySelector('.percent');
        percentContent.innerHTML = `${percent}%`;
        if (event.loaded == event.total) {
            percentContent.innerHTML = `<span class="material-symbols-outlined">done</span>`;
        }                  
    });
    // 监听上传完成事件
    xhr.addEventListener('load', function(event) {
        console.log('Video uploaded successfully');
    });

    xhr.send(formData);
}
let selected = {};              
const deleteBtn = document.querySelector('.btn-container button'),
        rows = document.querySelectorAll(".video-list .row");
rows.forEach((row) => {
    let checkedItem = row.querySelector('.check');
    let vid = row.querySelector('.name.vid').textContent;
    checkedItem.onchange = () => {
        console.log(row.querySelector('.name.vid').textContent);
        if (checkedItem.checked)
            selected[vid] = row;
        else
            delete selected[vid];
    };
});
deleteBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/remove');
    xhr.setRequestHeader('content-type', 'application/json');
    let jsonstr = JSON.stringify(selected);
    xhr.send(jsonstr);
};
// add_btn = document.getElementById('add-btn');
// loading_list = document.querySelector('.video-container .upload');
// add_btn.onclick = () => {
//     loading_list.style.display = 'block';
// };