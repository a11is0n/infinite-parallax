/**
 * Variables for images used in this experiment; paths are relative to the main
 * folder.  Element prefixes are followed by a number starting at 0.
 */
var backgroundPath = 'images/background.png';
var backgroundHeight;
var elementPathPrefix = 'images/element';
var elementPathPostfix = '.png';

/**
 * Variables for elements in the landscape
 */
var landscape, level0, level1, level2;
var landscapeHeight;
var backgroundMax;
var levelWidth;
var elementWidth, elementHeight;

/**
 * Variables for manipulating elements in the landscape
 */
var level1Scale = .8;
var level2Scale = .6;
var level0Top, level1Top, level2Top;
var level0Offset = 10;
var level1Offset = 20;
var level2Offset = 40;
var triple = []; // x-values of centers for 3-element levels
var double = []; // x-values of centers for 2-element levels
var level0ElementHalfWidth;
var level1ElementHalfWidth;
var level2ElementHalfWidth;
var frontCount = 3; // Start with 3 elements in front level

/*
 * When the document is ready, set everything up
 */
$(document).ready(setUp);

/**
 * Set up the global variables and event handlers for this page.
 */
function setUp() {

  // Set the variables for elements in the landscape
  $landscape = $('#landscape');
  $level0 = $('#level-0');
  $level1 = $('#level-1');
  $level2 = $('#level-2');
  landscapeHeight = $landscape.height();
  levelWidth = $('.level').width();
  
  // Set the variables for manipulating elements in the landscape
  level2Top = 0;
  
  // Initial level 0 elements
  $level0.append('<img class="element" src="images/element0.png" />');
  $level0.append('<img class="element" src="images/element1.png" />');
  $level0.append('<img class="element" src="images/element2.png" />');
  
  // Initial level 1 elements
  $level1.append('<img class="element" src="images/element0.png" />');
  $level1.append('<img class="element" src="images/element5.png" />');
  
  // Initial level 2 elements
  $level2.append('<img class="element" src="images/element3.png" />');
  $level2.append('<img class="element" src="images/element4.png" />');
  $level2.append('<img class="element" src="images/element5.png" />');

  // Get the height of the current background image
  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    backgroundHeight = this.height;
    // backgroundMax set here since it depends on backgroundHeight
    backgroundMax = backgroundHeight - landscapeHeight;
  }
  backgroundImage.src = backgroundPath;
  
  // Get the width and height of elements, assume they are all the same
  var element = new Image();
  element.onload = function() {
    elementWidth = this.width;
    elementHeight = this.height;
    // These are set here since they depend on elementWidth and elementHeight
    level0Top = landscapeHeight - elementHeight - (level0Offset / 2);
    level1Top = ((landscapeHeight - (elementHeight * level1Scale)) / 2) - (level1Offset / 2);
    var third = levelWidth / 3;
    triple[0] = (third / 2);
    triple[1] = triple[0] + third;
    triple[2] = triple[1] + third;
    var half = levelWidth / 2;
    double[0] = third;
    double[1] = third * 2;
    level0ElementHalfWidth = elementWidth / 2;
    level1ElementHalfWidth = (elementWidth * level1Scale) / 2;
    level2ElementHalfWidth = (elementWidth * level2Scale) / 2;
    // Set initial element positions here since they depend on above variables
    var $level0Elements = $level0.find('.element');
    $.each($level0Elements, function(index) {
      $(this).css({
        top: ((Math.random() * level0Offset) + level0Top) + 'px',
        left: ((Math.random() * level0Offset) + triple[index] - level0ElementHalfWidth) + 'px'
      });
    });
    var $level1Elements = $level1.find('.element');
    $.each($level1Elements, function(index) {
      $(this).css({
        top: ((Math.random() * level1Offset) + level1Top) + 'px',
        left: ((Math.random() * level1Offset) + double[index] - level1ElementHalfWidth) + 'px'
      });
    });
    var $level2Elements = $level2.find('.element');
    $.each($level2Elements, function(index) {
      $(this).css({
        top: ((Math.random() * level2Offset) + level2Top) + 'px',
        left: ((Math.random() * level2Offset) + triple[index] - level2ElementHalfWidth) + 'px'
      });
    });
  }
  element.src = elementPathPrefix + 0 + elementPathPostfix;
  
  $(document).mousemove(changePositions);
  $landscape.click(moveForward);

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
  var bgX = -(mouseX / width) * backgroundMax;
  var bgY = -(mouseY / height) * backgroundMax;
  $landscape.css('backgroundPosition', bgX + 'px ' + bgY + 'px');
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