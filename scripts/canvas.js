const canvas = document.querySelector("canvas");
const body = document.body;
const scrollHeight = body.scrollHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;

const context = canvas.getContext("2d");

let mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener('resize' , () =>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    circles = [];
    init();
});


window.addEventListener("mousemove" , (event) =>{
    mouse.x = event.x;
    mouse.y = event.y;
})



const numberOfCircles = 200;
const maxRadius = 30;
const circles = [];
const colors = [
  "rgba(97, 6, 255, 0.4)", // soft violet with opacity
];


class Circle{
    constructor(x , y ,radius, color , velocity , mass){
        this.x = x;
        this.y = y;
        this.velocity = velocity
        this.radius = radius;
        this.color = color;
        this.mass = mass;
        this.opacity = 0;
    }
    draw = () =>{
        context.beginPath();
        context.arc(this.x , this.y , this.radius, 0 , Math.PI * 2 , false);
        context.save();
        context.globalAlpha = this.opacity;
        context.fillStyle = this.color;
        context.fill();
        context.restore();
        context.strokeStyle = this.color;
        context.stroke();
    }

    update(){

        if (this.x + this.radius + this.velocity.x >= canvas.width || this.x + this.radius + this.velocity.x <= 0){
            this.velocity.x *= -1;
        }
        if (this.y + this.radius + this.velocity.y >= canvas.height || this.y + this.radius + this.velocity.y <= 0){
            this.velocity.y *= -1;
        }

        for (let i = 0 ; i < circles.length; i++){
            if (this === circles[i]) continue;

            if (distance(this.x , this.y , circles[i].x , circles[i].y) - this.radius * 2 < 0){
                resolveCollision(this , circles[i])
            }

            // draw lines
            let maxDistance = 100;
            const dist = distance(this.x, this.y, circles[i].x, circles[i].y);
            if (dist < maxDistance) {
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(circles[i].x, circles[i].y);
                const distOpacity = 1 - dist / maxDistance;
                context.strokeStyle = `rgba(0, 187, 249, ${distOpacity})`;
                context.lineWidth = 0.5;
                context.stroke();
            }

        }

        if (distance(mouse.x , mouse.y , this.x , this.y) <= 120 && this.opacity < 0.5){
            this.opacity += 0.02;
        }else if (this.opacity > 0){
            this.opacity -= 0.02;

            this.opacity = Math.max( 0 , this.opacity)
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;


        this.draw();
    }

}

function distance (x , y , x2 , y2){
    let xDist = x2 - x;
    let yDist = y2 - y;

    return Math.sqrt(Math.pow(xDist , 2) + Math.pow(yDist , 2));
}

function rotate(velocity , angle){
     return {
        x : velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y : velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
}

function resolveCollision(circle , otherCircle){

    const xVelocityDiff = circle.velocity.x - otherCircle.velocity.x;
    const yVelocityDiff = circle.velocity.y - otherCircle.velocity.y;

    const xDist = otherCircle.x - circle.x;
    const yDist = otherCircle.y - circle.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist  >=0){
        const angle = -Math.atan2(yDist , xDist);

        const m1 = circle.mass;
        const m2 = otherCircle.mass;

        const u1 = rotate(circle.velocity , angle);
        const u2 = rotate(otherCircle.velocity , angle);

        const v1 = {
            x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * (2 * m2) / (m1 + m2),
            y: u1.y
        };
        const v2 = {
            x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * (2 * m1) / (m1 + m2),
            y: u2.y
        };
        
        
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        circle.velocity.x = vFinal1.x;
        circle.velocity.y = vFinal1.y;

        otherCircle.velocity.x = vFinal2.x;
        otherCircle.velocity.y = vFinal2.y;
    }

}

function init(){ 
    for(let i = 0; i < numberOfCircles; i++){
        const color = colors[(Math.floor(Math.random() * colors.length))];
        const radius = 1;
        let velocity = {
            x : (Math.random() < 0.5) ? -0.09 : 0.09,
            y :(Math.random() < 0.5) ? -0.09 : 0.09
        }
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;

        if (i != 0){
            for (let j =0; j < circles.length; j++){
                if (distance(x , y , circles[j].x , circles[j].y) - radius * 2 < 0){
                    x = Math.random() * (canvas.width - 2 * radius) + radius;
                    y = Math.random() * (canvas.height - 2 * radius) + radius;

                    j = -1;// restart loop
                }
            }
        }

        circles.push(new Circle(x , y ,radius , color ,velocity , 100));
    }
}

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0 , 0 , canvas.width , canvas.height);

    for (let i = 0 ; i < circles.length; i++){
        circles[i].update();
    }

   
}

init();
animate();

