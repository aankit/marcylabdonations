let img;
let imgWidth
let marcy_green;
let goal;
let donated;
let left;
let level;
let offset;

function preload() {
  img = loadImage('ml-1.png');
  myFont = loadFont('Alice-Regular.ttf');
  marcy_green = color(15,196, 146);
  url = 'https://spreadsheets.google.com/feeds/list/1GMnMrVTio3GSPSs55oWiom5dnEbC_s4QMSky3H9s0Z4/od6/public/basic?alt=json'
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let ratio = img.width/img.height
  imgWidth = windowHeight*ratio
  img.resize(imgWidth, windowHeight);
  goal = 30000
  donated = 0;
  offset = 28;
  
}

function draw(){
  loadJSON(url, updateDonations);
  background(255);
  
  //Fill the LOGOGOGOGOGOGO!
  fill(marcy_green);
  noStroke();
  left = goal-donated;
  level = map(left, 0, goal, offset, height-offset);
  rect(0, level, img.width, img.height);
  
  //Time for TEXT
  fill('#0fc492');
  textFont(myFont);
  textSize(36);
  let displayAmount = "$"+ donated.toLocaleString('en-US');
  let displayGoal = "$"+goal.toLocaleString('en-US');
  text(displayAmount, imgWidth+10, level);
  text(displayGoal, imgWidth+10, offset);
  image(img, 0, 0)
}

function updateDonations(data){
  donated = 0;
  let donations = data.feed.entry
  donations.forEach(
    function(e){
      let d = parseFloat(e.content.$t.split(":")[1]);
      donated += d;
    });
}


