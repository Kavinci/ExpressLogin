//initialize some global variables
var canvas;
var ctx;

function init() {
    //get drawing destiniation
    canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        //set height and width
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx = canvas.getContext('2d');
        for (i = 0; i < drop.count; i++){
            var data = drop.init(i);
            drop.rain.push(data);
            drop.draw(i);          
        }
        roof.init();
        window.setInterval(draw, 1000/60);
    }
    else {
        //Change background to static image?
        console.log('else');
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    physics.fall();
    physics.collision(); 
}

var drop = {
    init: function (i) {
        //initialize the rain values
        this.x = Math.floor(Math.random() * canvas.width); //X position calculated
        this.y = Math.floor((Math.random() * canvas.height * 2) - (canvas.height * 2)); //Y position calculated
        this.z = Math.random(); //Random z position
        var val = this.hex[Math.floor(Math.random() * this.hex.length)]; //Random hex value calculated
        var fontSize = Math.floor(this.z * 50).toString() + 'px serif'; //Use z position scale to change font size
        this.yv = this.gravity;

        return [this.x, this.y, this.z, val, this.xv, this.yv, fontSize];
    },

    draw: function (i) {
        ctx.font = this.rain[i][6];
        ctx.fillStyle = 'rgb(76, 0, 135, 0.9)';
        ctx.fillText(this.rain[i][3], this.rain[i][0], this.rain[i][1]);
    },

    rain: new Array(),

    count: 150,

    hex: ['0', '1', '2', '3', '#', '4', '5', '6', '7', '#', '8', '9', 'A', 'B', '#', 'C', 'D', 'E', 'F', '#'],

    x: 0, //initial x position, calculated

    y: 0, //initial y position, start above the screen

    z: 0, //Simulates z position by scaling, calculated

    zThresh: 0.3, //Z threshold for collision

    xv: 0, // velocity in the x direction

    yv: 0, // velocity in the y direction

    gravity: 3 // velocity downward, constant
};

//get location data for html elements
var roof = {
    init: function () {
        pageData = document.getElementById('page').getClientRects()[0];
        //console.log(pageData);

        welcomeData = document.getElementById('welcome').getClientRects()[0];
        //console.log(welcomeData);

        this.point.left = { x: pageData.left, y: pageData.top + welcomeData.height };
        //console.log(this.point.left);

        this.point.right = { x: pageData.left + pageData.width, y: pageData.top + welcomeData.height };
        //console.log(this.point.right);

        this.point.top = { x: welcomeData.left + (welcomeData.width / 2), y: pageData.top - welcomeData.height };
        //console.log(this.point.top);    

        this.boundary.left.height = this.point.left.y - this.point.top.y;
        this.boundary.left.width = this.point.top.x - this.point.left.x;
        this.boundary.left.angle = this.boundary.left.height / this.boundary.left.width;
        //console.log(this.boundary.left.angle);

        this.boundary.right.height = this.point.right.y - this.point.top.y;
        this.boundary.right.width = this.point.right.x - this.point.top.x;
        this.boundary.right.angle = this.boundary.right.height / this.boundary.right.width;
        //console.log(this.boundary.right.angle);
    },

    draw: function () {
        //Draw roof over other html elements
        ctx.beginPath();
        ctx.moveTo(this.point.left.x, this.point.left.y);
        ctx.lineTo(this.point.top.x, this.point.top.y);
        ctx.lineTo(this.point.right.x, this.point.right.y);
        ctx.lineWidth = 7;
        ctx.strokeStyle = '#DE6449';
        ctx.lineCap = "round";
        ctx.stroke();
    },

    point: {
        left: {},
        right: {},
        top: {}
    },

    boundary: {

        left: {

            height: 0,

            width: 0,

            angle: 0
        },

        right: {

            height: 0,

            width: 0,

            angle: 0
        }
    },

    pageData: {},

    welcomeData: {}
};

var physics = {

    //Fall at constant rate
    fall: function () {
        roof.draw();
        this.collision();
    },

    //Check for collision
    collision: function () {
        //If hex position = roof position then Bounce
        for (i = 0; i < drop.count; i++) {
            if (drop.rain[i][1] > canvas.height) {
                this.bounce(i, '');
            }
            //Left side of roof
            else if (drop.rain[i][0] > (roof.point.left.x - Math.floor(drop.rain[i][2] * 30)) && drop.rain[i][0] < roof.point.top.x && drop.rain[i][1] > roof.point.top.y + (roof.point.top.x - drop.rain[i][0]) * roof.boundary.left.angle) {
                this.bounce(i, 'left');
            }
            //Right side of roof
            else if (drop.rain[i][0] > roof.point.top.x && drop.rain[i][0] < roof.point.right.x && drop.rain[i][1] > roof.point.top.y + (roof.point.top.x - drop.rain[i][0]) * (0 - roof.boundary.right.angle)) {
                this.bounce(i, 'right');
            }
            else {
                drop.rain[i][1] = drop.rain[i][1] + drop.gravity;
                drop.draw(i);
            }
        }
    },

    //[this.x, this.y, this.z, val, this.xv, this.yv, fontSize]
    //Bounce (into object data) return out object data
    bounce: function (i, dir) {
        if (dir === 'left' && drop.rain[i][2] > drop.zThresh) {
            drop.rain[i][5] = 0 - drop.rain[i][5];
            drop.rain[i][1] = drop.rain[i][1] - 2;

            drop.rain[i][0] = drop.rain[i][0] - 4;
        }
        else if (dir === 'right' && drop.rain[i][2] > drop.zThresh) {
            drop.rain[i][5] = 0 - drop.rain[i][5];
            drop.rain[i][1] = drop.rain[i][1] - 2;

            drop.rain[i][0] = drop.rain[i][0] + 4;
        }
        else {
            drop.rain[i] = drop.init(i);
        }
    }
};