let canvas, ctx;
let WIDTH, HEIGHT;

const square = {
    length : 0,
    offset : 100,
    x : 100,
    y : 100,
}

function init() {
    if (!!window.HTMLCanvasElement) {
        canvas = document.getElementById('c');
        ctx = canvas.getContext('2d');

        onresize();
        square.length = HEIGHT - square.offset * 2;

        window.addEventListener("resize", onresize, false);

        render();
    }
}

function render() {
    window.requestAnimationFrame(render);

    // Drawing the square
    ctx.strokeStyle = 'red';
    ctx.strokeRect(square.x, square.y, square.length, square.length);

    // Drawing the circle
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.arc(square.x + square.length / 2, square.y + square.length / 2, square.length/2, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
}


// Draws a border
function redraw() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = '2';
    ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
}

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.
function onresize() {
    WIDTH = canvas.width = window.innerWidth;
    HEIGHT = canvas.height = window.innerHeight;
    redraw();
}
