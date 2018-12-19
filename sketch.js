var n;
var k;
var master = [];
var hubs = [];
var subs = [];

function setup() {
    createCanvas(windowWidth, windowHeight - 200);
    background(255);
    //Number of observations
    n = 1000;
    //Number of sets
    k = 3;

    //Assign n observations vectors to the master array
    for (let i = 0; i < n; i++) {
        master.push(createVector(random(10, width - 10), random(10, height - 10)));
    }

    //Assign k hub vectors to the hub array  
    //Assign k empty arrays to the subs array
    for (let i = 0; i < k; i++) {
        hubs.push(createVector(random(10, width - 10), random(10, height - 10)));
        subs.push([]);
    }
    drawMast();
    drawHubs();
}

function draw() {

}

function clearSubs() {
    subs = [];
    for (let i = 0; i < k; i++) {
        subs.push([]);
    }
}

function assignment() {
    clearSubs();
    for (const item of master) {
        let nearest = width * height;
        let index = 0;
        for (let i = 0; i < hubs.length; i++) {
            let distance = dist(hubs[i].x, hubs[i].y, item.x, item.y);
            if (distance < nearest) {
                nearest = distance;
                index = i;
            }
        }
        subs[index].push(item);
    }
}

function hubCalc() {
    for (let i = 0; i < subs.length; i++) {
        let total = createVector(0, 0);
        let test = subs[i].length;
        for (let j = 0; j < subs[i].length; j++) {
            total.add(subs[i][j]);
        }
        total = total.mult(1 / subs[i].length);
        hubs[i] = total;
    }
}

function drawMast() {
    for (const item of master) {
        fill(200);
        ellipse(item.x, item.y, 10);
    }
}

function drawHubs() {
    for (const item of hubs) {
        fill(210, 30, 19);
        ellipse(item.x, item.y, 15);
    }
}

function drawAssign() {
    for (let i = 0; i < subs.length; i++) {
        //Assign a colour for each cluster
        let colour = color(random(255), random(255), random(255));

        //Draw observations from each sub.
        for (const obser of subs[i]) {
            fill(colour);
            stroke(colour);
            line(obser.x, obser.y, hubs[i].x, hubs[i].y);
            noStroke();
            ellipse(obser.x, obser.y, 10);
        }

        //Draw each hub
        fill(colour);
        stroke(0);
        ellipse(hubs[i].x, hubs[i].y, 15);
    }
}

function keyTyped() {
    if (key === 'a') {
        background(255);
        assignment();
        drawAssign();
    } else if (key === 'c') {
        hubCalc();
    }
}
