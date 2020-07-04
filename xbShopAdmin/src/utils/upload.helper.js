/**
 * focus on upload utilities
 */
export function resizeMe(img, type, maxWidth, maxHeight) {
    const canvas = document.createElement('canvas');
    const { width, height } = img;
    let _width;
    let _height;
    const _maxWidth = !Number.isNaN(maxWidth) ? maxWidth : 0;
    const _maxHeight = !Number.isNaN(maxHeight) ? maxHeight : 0;

    if (_maxWidth === 0) {
        if (height > _maxHeight) {
            _width = Math.round(width * (_maxHeight / height));
            _height = _maxHeight;
        }
    }
    if (_maxHeight === 0) {
        if (width > _maxWidth) {
            _height = Math.round(height * (_maxWidth / width));
            _width = _maxWidth;
        }
    }
    const ctx = canvas.getContext('2d');
    canvas.width = _width;
    canvas.height = _height;
    ctx.drawImage(img, 0, 0, _width, _height);
    const _type = type === 'jpg' ? 'jpeg' : type;
    return canvas.toDataURL(`image/${_type}`, 0.7); // 这里的0.7值的是图片的质量
}

export function selectFileImage(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        const fileType = file.name.split('.')[1];
        reader.readAsArrayBuffer(file);

        reader.onload = (ev) => {
            const blob = new Blob([ev.target.result]);
            const urlObj = window.URL || window.webkitURL;
            const blobURL = urlObj.createObjectURL(blob);
            const image = new Image();
            image.src = blobURL;
            image.onload = () => {
                const thumb = resizeMe(image, fileType, 400, 0); // 获得的路径是将图片转换成了base64
                resolve(thumb);
            };
        };
    });
}
