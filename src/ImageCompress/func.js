const compress = async (file, originalRef, compressRef) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
        fileReader.onload = function (event) {
            const image = new Image();

            image.onload = function () {
                originalRef.current.src = image.src;

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = image.width / 4;
                canvas.height = image.height / 4;
                context.drawImage(image,
                    0,
                    0,
                    image.width,
                    image.height,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                compressRef.current.src = canvas.toDataURL('image/jpeg', 0.5);
                resolve(canvas.toDataURL())
            }
            image.src = event.target.result;
        };
    })
}

const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

const imagePicker = async (files, originalRef, compressRef) => {
    const filterType = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

    if (files.length !== 0) {
        const file = files [0];
        if (!filterType.test(file.type)) {
            alert("Please select a valid image.");
        } else {
            const base64 = await compress(file, originalRef, compressRef);
            return {
                source: dataURItoBlob(base64),
                fileName: file.name
            }
        }
    }
}

export default imagePicker;
