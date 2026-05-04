let score = parseInt(localStorage.getItem("score")) || 0;
const sizes = [16, 32, 48, 64, 128, 256];

function resizeImage(img, size) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, size, size);
    return ctx.getImageData(0, 0, size, size);
}

/* === Génération ICO === */
function generateICO(imageDatas) {
    const headerSize = 6;
    const dirEntrySize = 16;
    let offset = headerSize + dirEntrySize * imageDatas.length;
    const buffers = [];

    const header = new ArrayBuffer(headerSize);
    const hv = new DataView(header);
    hv.setUint16(0, 0, true);
    hv.setUint16(2, 1, true);
    hv.setUint16(4, imageDatas.length, true);
    buffers.push(header);

    const images = [];

    imageDatas.forEach(imgData => {
        const entry = new ArrayBuffer(dirEntrySize);
        const v = new DataView(entry);

        v.setUint8(0, imgData.width === 256 ? 0 : imgData.width);
        v.setUint8(1, imgData.height === 256 ? 0 : imgData.height);
        v.setUint16(4, 1, true);
        v.setUint16(6, 32, true);

        const bmp = imageDataToBMP(imgData);
        v.setUint32(8, bmp.byteLength, true);
        v.setUint32(12, offset, true);

        offset += bmp.byteLength;
        buffers.push(entry);
        images.push(bmp);
    });

    buffers.push(...images);

    const total = buffers.reduce((a,b)=>a+b.byteLength,0);
    const out = new Uint8Array(total);
    let p = 0;
    buffers.forEach(b => {
        out.set(new Uint8Array(b), p);
        p += b.byteLength;
    });

    return new Blob([out], { type: "image/x-icon" });
}

function imageDataToBMP(imgData) {
    const w = imgData.width;
    const h = imgData.height;
    const data = imgData.data;
    const buf = new ArrayBuffer(40 + w * h * 4);
    const v = new DataView(buf);

    v.setUint32(0, 40, true);
    v.setInt32(4, w, true);
    v.setInt32(8, h * 2, true);
    v.setUint16(12, 1, true);
    v.setUint16(14, 32, true);

    let p = 40;
    for (let y = h - 1; y >= 0; y--) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            v.setUint8(p++, data[i+2]);
            v.setUint8(p++, data[i+1]);
            v.setUint8(p++, data[i]);
            v.setUint8(p++, data[i+3]);
        }
    }
    return buf;
}

/* === LOGIQUE PRINCIPALE === */
document.getElementById("convert").onclick = async () => {
    const file = upload.files[0];
    if (!file) return alert("Veuillez choisir un fichier");
    const name = file.name.replace(/\.[^/.]+$/, "");
    const ext = file.name.split(".").pop().toLowerCase();

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    score += 10;
    localStorage.setItem("score", score);
    /* ICO ➜ JPG */
    if (ext === "ico") {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0);

        canvas.toBlob(blob => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = name + ".jpg";
            a.click();
        }, "image/jpeg", 0.95);

    /* JPG/PNG ➜ ICO */
    } else {
        const imageDatas = sizes.map(s => resizeImage(img, s));
        const icoBlob = generateICO(imageDatas);

        const a = document.createElement("a");
        a.href = URL.createObjectURL(icoBlob);
        a.download = name + ".ico";
        a.click();
    }
};
