var total = 50;

const globe = new Array(total + 1);
var offset = 0;
var m = 0;
var mchange = 0;

function setup() {
    createCanvas(600, 600, WEBGL);
    createEasyCam();
    colorMode(HSB);
    // document.oncontextmenu = () => false;
    for (let i = 0; i < total + 1; i++) {
        globe[i] = new Array(total + 1);
    }
}

function draw() {
    m = map(sin(mchange), -1, 1, 0, 7);
    mchange += 0.05;

    background(0);
    noStroke();
    pointLight(0, 0, 255, 0, -400, 600);
    // lights();

    var r = 200;
    for (let i = 0; i < total + 1; i++) {
        let lat = map(i, 0, total, -HALF_PI, HALF_PI);
        let r2 = superShape(lat, m, 0.2, 1.7, 1.7);
        // let r2 = superShape(lat, 2, 10, 10, 10);
        for (let j = 0; j < total + 1; j++) {
            let lon = map(j, 0, total, -PI, PI);
            let r1 = superShape(lon, m, 0.2, 1.7, 1.7);
            // let r1 = superShape(lon, 8, 60, 100, 30);
            let x = r * r1 * r2 * cos(lon) * cos(lat);
            let y = r * r1 * r2 * sin(lon) * cos(lat);
            let z = r * r2 * sin(lat);
            globe[i][j] = new Array(x, y, z);
            // const randVector = new Array(Math.random() * 10, Math.random() * 10, Math.random() * 10);
            // for (let k = 0; k < 3; k++) {
            //     globe[i][j][0] += randVector[0];
            //     globe[i][j][1] += randVector[1];
            //     globe[i][j][2] += randVector[2];
            // }
        }
    }
    // stroke(255);
    // fill(50);
    // noFill();
    offset += 5;
    for (let i = 0; i < total; i++) {
        const hue = map(i, 0, total, 0, 255 * 6);
        fill((hue + offset) % 255, 255, 255);
        beginShape(TRIANGLE_STRIP);
        for (let j = 0; j < total + 1; j++) {
            let v1 = globe[i][j];
            // stroke(255);
            // strokeWeight(2);
            vertex(v1[0], v1[1], v1[2]);
            let v2 = globe[i + 1][j];
            vertex(v2[0], v2[1], v2[2]);
        }
        endShape();
    }
}

let a = 1;
let b = 1;
function superShape(theta, m, n1, n2, n3) {
    let r = 1;
    let t1 = abs((1 / a) * cos((m * theta) / 4));
    t1 = Math.pow(t1, n2);
    let t2 = abs((1 / b) * sin((m * theta) / 4));
    t2 = Math.pow(t2, n3);
    let t3 = t1 + t2;
    r = Math.pow(t3, -1 / n1);
    return r;
}
