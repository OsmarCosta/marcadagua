let inputI = document.querySelector('#inputImagem');
let inputM = document.querySelector('#inputMarca');
let inputT = document.querySelector('#tranparencia');
let inputX = document.querySelector('#x');
let inputY = document.querySelector('#y');
let inputS = document.querySelector('#tamanho');
let inputNome = document.querySelector('#nome');

let o = 0.5;
let x = 0;
let y = 0;
let s = inputS.min;
let auxX = 0;
let auxY = 0;

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let baixar = document.querySelector('#baixar');

inputT.addEventListener('change', () => {
    o = inputT.value/10;
    desenhaTela(inputI, inputM, inputX, inputY, canvas, ctx, o, x, y, s);
});

inputX.addEventListener('change', () => {
    x = inputX.value;
    desenhaTela(inputI, inputM, inputX, inputY, canvas, ctx, o, x, y, s);
});

inputY.addEventListener('change', () => {
    y = inputY.value;
    desenhaTela(inputI, inputM, inputX, inputY, canvas, ctx, o, x, y, s);
});

inputM.addEventListener('change', () => {
    desenhaTela(inputI, inputM, inputX, inputY, canvas, ctx, o, x, y, s);
});

inputI.addEventListener('change', () => {
    configura(inputI, inputX, inputY);
});

inputS.addEventListener('change', () => {
    s = inputS.value/10;
    desenhaTela(inputI, inputM, inputX, inputY, canvas, ctx, o, x, y, s);
});

baixar.addEventListener('click', () => {
    html2canvas(canvas, { useCORS: true }).then(function (canvas) {
        let imagemCodificadaEmURL = canvas.toDataURL();
    
        let linkEl = document.createElement('a');
        linkEl.download = inputNome.value + ".png";
        linkEl.href = imagemCodificadaEmURL;
    
        
        document.body.appendChild(linkEl);
    
        linkEl.click();
      }
)});

function desenhaTela(inputI, inputM, inputX, inputY, canvas, ctx, o, x, y, s){
    ctx.clearRect(0, 0, inputX.max, inputY.max);
    desenha(inputI, canvas, ctx, 0);
    desenha(inputM, canvas, ctx, 1, o, x, y, s);
}

function configura(input, inputX, inputY) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();
            img.onload = function(){
                inputX.max = img.width;
                inputY.max = img.height;       
            }
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function desenha(input, canvas, ctx, tipo, o, x, y, s) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = new Image();
            img.onload = function(){
                if(tipo == 0){
                    ctx.scale(1, 1);
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img,0,0);
                } else if(tipo == 1){
                    ctx.globalAlpha = o;
                    ctx.scale(s, s);
                    ctx.drawImage(img, (x/s), ((y/s) - (0.5 * s)));
                } 
            }
            img.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}



