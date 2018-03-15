class Particle {
    constructor() {
        this.x = random(square.x, square.x + square.length);
        this.y = random(square.y, square.y + square.length);

        this.lifespan = 10;
    }

    inSquare() {
        let d = dist(this.x, this.y, square.x + square.length/2, square.y + square.length/2);
        return (d > square.length/2);
    }

    draw() {
        ctx.strokeStyle = "pink";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2*Math.PI);
        ctx.stroke();
        ctx.closePath();
    }
}
