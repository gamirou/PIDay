let canvas, ctx;
let WIDTH, HEIGHT;

let particles = [];

const stats = {
    particles: 0,
    real_pi: Math.PI,
    approx_pi: 0,
    max_number_of_particles: 1000
}

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

    ctx.beginPath();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    // Drawing the square
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(square.x, square.y, square.length, square.length);

    // Drawing the circle
    ctx.strokeStyle = 'forestgreen';
    ctx.beginPath();
    ctx.arc(square.x + square.length / 2, square.y + square.length / 2, square.length/2, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    particles.push(new Particle());

    for (let particle of particles) {
        particle.draw();
        particle.lifespan -= 0.1;

        if (particle.lifespan < 0) {
            particles.splice(particles.indexOf(particle), 1);
        }
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Draws a border
function redraw() {
    ctx.strokeStyle = 'green';
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


function dist(x1, y1, x2, y2) {
    return (Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2)))
}
