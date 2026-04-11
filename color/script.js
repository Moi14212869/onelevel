const picker = document.getElementById("colorPicker");
const preview = document.getElementById("preview");
const hex = document.getElementById("hex");
const rgb = document.getElementById("rgb");
const hsl = document.getElementById("hsl");
let score = localStorage. getItem('score') || 0;

function update(color) {
    preview.style.background = color;
    hex.textContent = color.toUpperCase();

    const r = parseInt(color.substr(1,2),16);
    const g = parseInt(color.substr(3,2),16);
    const b = parseInt(color.substr(5,2),16);

    rgb.textContent = `rgb(${r}, ${g}, ${b})`;

    const hslVal = rgbToHsl(r,g,b);
    hsl.textContent = `hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`;
}

function rgbToHsl(r,g,b){
    r/=255; g/=255; b/=255;
    let max=Math.max(r,g,b), min=Math.min(r,g,b);
    let h,s,l=(max+min)/2;

    if(max===min){h=s=0;}
    else{
        let d=max-min;
        s=l>0.5?d/(2-max-min):d/(max+min);
        switch(max){
            case r:h=(g-b)/d+(g<b?6:0);break;
            case g:h=(b-r)/d+2;break;
            case b:h=(r-g)/d+4;break;
        }
        h*=60;
    }
    return {h:Math.round(h),s:Math.round(s*100),l:Math.round(l*100)};
}

function copy(el){
    navigator.clipboard.writeText(el.textContent);
}

picker.addEventListener("input", e => {
  update(e.target.value);

  score = score + 10;
  localStorage.setItem("score", score);
});
update(picker.value);
