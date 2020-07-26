let inputI = document.querySelector('#inputImagem');
let inputM = document.querySelector('#inputMarca');
let inputT = document.querySelector('#tranparencia');
let inputX = document.querySelector('#x');
let inputY = document.querySelector('#y');

let o = 0.5;
let x = 0;
let y = 0;

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let montar = document.querySelector('#montar');
let baixar = document.querySelector('#baixar');

inputT.addEventListener('change', () => {
    o = inputT.value/10;
});

inputX.addEventListener('change', () => {
    x = inputX.value;
});

inputY.addEventListener('change', () => {
    y = inputY.value;
});

inputI.addEventListener('change', () => {
    configura(inputI, inputX, inputY);
});

montar.addEventListener('click', () => {
    desenha(inputI, canvas, ctx, 0);
    desenha(inputM, canvas, ctx, 1, o, x, y, 200, 200);
});

baixar.addEventListener('click', () => {
    html2canvas(canvas, { useCORS: true }).then(function (canvas) {
        let imagemCodificadaEmURL = canvas.toDataURL();
    
        let linkEl = document.createElement('a');
        linkEl.download = 'avatar.png';
        linkEl.href = imagemCodificadaEmURL;
    
        
        document.body.appendChild(linkEl);
    
        linkEl.click();
      }
)});

function configura(input, inputX, inputY) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();
            img.onload = function(){
                inputX.max = img.width;
                inputY.max = img.height;          
            }
            img.src = event.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function desenha(input, canvas, ctx, tipo, o, x, y, w, h) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();
            img.onload = function(){
                if(tipo == 0){
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img,0,0);
                } else if(tipo == 1){
                    ctx.globalAlpha = o;
                    ctx.drawImage(img, x, y, w, h);
                } else {

                }
                
            }
            img.src = event.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}



