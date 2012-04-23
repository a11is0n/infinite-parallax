/**
 * Variables for images used in this experiment; paths are relative to the main
 * folder.  Element prefixes are followed by a number starting at 0.
 */
var backgroundPath = 'images/background.png';
var backgroundHeight;
var elementPathPrefix = 'images/element';
var elementPathPostfix = '.png';
var elementCount = 0;

/**
 * Variables for elements in the landscape
 */
var landscape, level0, level1, level2;
var landscapeHeight;
var backgroundMax;

/*
 * When the document is ready, set everything up
 */
$(document).ready(setUp);

/**
 * Set up the global variables and event handlers for this page.
 */
function setUp() {

  // Get the height of the current background image
  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    backgroundHeight = this.height;
    // backgroundMax set here since it depends on backgroundHeight
    backgroundMax = backgroundHeight - landscapeHeight;
  }
  backgroundImage.src = backgroundPath;
  
  // Set the variables for elements in the landscape
  landscape = $('#landscape');
  level0 = $('#level-0');
  level1 = $('#level-1');
  level2 = $('#level-2');
  landscapeHeight = landscape.height();

  $(document).mousemove(changePositions);
  landscape.click(moveForward);

}

/**
 * Event handler for mousemove on the document; changes the positions of 
 * elements in the landscape based on mouse location and window size.
 */
function changePositions(event) {

  // Save the current window width and height
  var width = $(window).width();
  var height = $(window).height();
  
  // Save the current mouseX and mouseY
  var mouseX = event.pageX;
  var mouseY = event.pageY;
  
  /**
   * Edit the position of the background of the landscape.  The y position is 
   * calculated based on the height of the background image, so that when the 
   * mouse is at the top of the window the bottom of the image is shown, and 
   * when the mouse is at the bottom of window the top of the image is shown.
   * The x position is kind of whatever arbitrarily looked good.
   */
  var bgX = (mouseX / width) * backgroundMax;
  var bgY = -(mouseY / height) * backgroundMax;
  landscape.css('backgroundPosition', bgX + 'px ' + bgY + 'px');
  
  level0.text(mouseX);
  level1.text(mouseY);
  level2.text(bgX);
}

/*
 * Event handler for click on the landscape; manipulates elements in the
 * landscape to simulate moving "forward" into the landscape.
 */
function moveForward(event) {

  // Save the current window width and height
  var width = $(window).width();
  var height = $(window).height();
  
  // Save the current mouseX and mouseY
  var mouseX = event.pageX;
  var mouseY = event.pageY;

  alert('forward');

}