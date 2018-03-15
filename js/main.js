let canvas, ctx;
let WIDTH, HEIGHT;

let particles = [];

const stats = {
    particles: {
        in_square: 0,
        out_square: 0
    },

    real_pi: Math.PI,
    approx_pi: 0,
    max_number_of_particles: 10000,
    message : "π being processed"
}

const square = {
    length : 0,
    offset : 150,
    x : 150,
    y : 150,
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

    // Clearing rect
    ctx.beginPath();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Drawing the square
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(square.x, square.y, square.length, square.length);

    // Drawing the circle
    ctx.strokeStyle = 'forestgreen';
    ctx.beginPath();
    ctx.arc(square.x + square.length / 2, square.y + square.length / 2, square.length/2, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    // Drawing message
    text(stats.message, WIDTH/2, square.offset/2, "white", "center", "30px");

    if (Object.values(stats.particles).reduce((a, b) => a + b, 0) <= stats.max_number_of_particles) {
        particles.push(new Particle());
    }


    if (particles.length != 0) {
        for (let particle of particles) {
            particle.draw();
            particle.lifespan -= 1;

            if (particle.inSquare()) stats.particles.in_square++;
            else stats.particles.out_square++;

            if (particle.lifespan < 0) {
                particles.splice(particles.indexOf(particle), 1);
            }
        }
    } else {
        console.log("Done!")
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
    WIDTH = canvas.width = window.innerHeight;
    HEIGHT = canvas.height = window.innerHeight;
    redraw();
}


function dist(x1, y1, x2, y2) {
    return (Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2)))
}


/**
    Displays text with a given position, align and the size
    *** t - {String} - The text
    *** x, y - {Number} - X and y coordinates
    *** c - {String} - Colour of the text
    *** align - {String} - It aligns the text to center, left etc.
    *** size - {Number} - Size of the text
*/
function text(t, x, y, c, align, size) {
    if (align) ctx.textAlign = align;
    if (!size) {
        size = 25;
    }
    ctx.font = "bold " +size+ "px Calibri";
    ctx.fillStyle = c;
    ctx.fillText(t,x,y);
}
