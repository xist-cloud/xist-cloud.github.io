var rows, cols;
var w = 30;
var cells = [];

var current;
var stack = [];

class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        // trbl
        this.walls = [true, true, true, true];
        this.visited = false;
    }

    show() {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y, x, y + w);
        }

        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, w, w);
        }
    }

    checkNeighbors() {
        var neighbours = [];

        var top = cells[this.index(this.i, this.j - 1)];
        var right = cells[this.index(this.i + 1, this.j)];
        var bottom = cells[this.index(this.i, this.j + 1)];
        var left = cells[this.index(this.i - 1, this.j)];

        if (top && !top.visited) {
            neighbours.push(top);
        }

        if (right && !right.visited) {
            neighbours.push(right);
        }

        if (bottom && !bottom.visited) {
            neighbours.push(bottom);
        }

        if (left && !left.visited) {
            neighbours.push(left);
        }

        if (neighbours.length > 0) {
            var r = floor(random(0, neighbours.length));
            return neighbours[r];
        }
    }

    index(i, j) {
        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
            return -1;
        }
        return i + j * cols;
    }

    highlight() {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(0, 255, 0);
        rect(x, y, w, w);
    }
}

function setup() {
    createCanvas(600, 600);
    cols = floor(width / w);
    rows = floor(height / w);

    // frameRate(5);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            cells.push(cell);
        }
    }

    current = cells[0];
}

function draw() {
    background(51);
    for (let i = 0; i < cells.length; i++) {
        cells[i].show();
    }

    current.visited = true;
    current.highlight();
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        stack.push(current);

        removeWalls(current, next);

        current = next;
    } else if (stack.length > 0) {
        var cell = stack.pop();
        current = cell;
    }
}

function removeWalls(a, b) {
    let dx = a.i - b.i;
    let dy = a.j - b.j;
    if (dx === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    }
    if (dx === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    if (dy === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
    if (dy === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    }
}
