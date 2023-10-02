function getHttpObject() {
    var xhr = false;
    if (window.XMLHttpRequest)
        xhr = new XMLHttpRequest();
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    return xhr;
}

function send(url, callback, imgId) {
    callback = callback || function () { };
    var xhr = getHttpObject();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.timeout = 10000;
    xhr.responseType = "arraybuffer";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status == 200 || xhr.status == 304)) {
            let dataView = new DataView(this.response);
            let data = new Uint8Array(dataView.buffer);

            callback(data, imgId)
        }
    };
    
    xhr.send();
}

function parseCeb(data, imgId) {
    let key = 968542557;
    for (let i = 0; i < 100; i++) {
        if (i >= data.length) {
            break;
        }
        data[i] = (data[i] ^ key) & 0xff;
        if (data[i] > 127) {
            data[i] -= 256;
        }
    }

    let arrayBuffer = data.buffer;
    let aBlob = new Blob([arrayBuffer], { type: "application/octet-binary" });
    let imgBlob = URL.createObjectURL(aBlob);

    pImg1(imgBlob, imgId);
}

function aesDecrypt(decryptString, k = '1234') {
    var key = CryptoJS.enc.Utf8.parse(k);
    var decrypt = CryptoJS.AES.decrypt(decryptString, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

function parseCcc(data, imgId) {
    const reader = new FileReader()
    reader.onload = function () {
        $('#'+imgId)[0].src = aesDecrypt(reader.result)
    }

    let arrayBuffer = data.buffer;
    let aBlob = new Blob([arrayBuffer], { type: "application/octet-binary" });

    reader.readAsText(aBlob)
}

function pImg1(imgBlob, imgId) {
    let img1 = document.getElementById(imgId)
    img1.src = imgBlob;

    img1.onload = function () {
        window.URL.revokeObjectURL(imgBlob);
    }
}

function getExt(str) {
    return str.substring(str.lastIndexOf(".") + 1)
}

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
