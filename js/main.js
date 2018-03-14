let canvas, ctx;

let WIDTH, HEIGHT;

function init() {
    let canvas_supported = !!window.HTMLCanvasElement;

    if (canvas_supported) {
        canvas = document.getElementById('c');
        ctx = canvas.getContext('2d');

        onresize();
        console.log(WIDTH, HEIGHT);

        window.addEventListener("resize", onresize, false);
    }
}


// Draws a border
function redraw() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = '5';
    ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
}

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.
function onresize() {
    WIDTH = canvas.width = window.innerWidth - 10;
    HEIGHT = canvas.height = window.innerHeight - 10;
    redraw();
}
