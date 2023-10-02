function initImg(arr) {
    arr.forEach((i, k) => {
        var suffix = getExt(i);
        switch (suffix) {
            case 'ceb':
                send(i, parseCeb, "img" + k);
                break;
                
            case 'ccc':
                console.log(1)
                send(i, parseCcc, "img" + k);
                break;
            
            default:
                if ($('#img' + k)[0]) {
                    $('#img' + k)[0].src = i
                }

                if ($('#' + k)[0]) {
                    $('#' + k)[0].src = i
                }
        }
    })
}