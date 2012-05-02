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
var level0MinMove = 10;
var level1MinMove = 20;
var level2MinMove = 40;
var levelMoveOffset = 10;
var level1Left = true; // Keep track of level 1 movement - alternate

/*
 * When the document is ready, set everything up.  Uses the "shortcut" function 
 * call for $(document).ready()
 */
$(setUp);

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
  $level0
    .append('<img class="element" src="images/element0.png" />')
    .append('<img class="element" src="images/element1.png" />')
    .append('<img class="element" src="images/element2.png" />');
  
  // Initial level 1 elements
  $level1
    .append('<img class="element" src="images/element0.png" />')
    .append('<img class="element" src="images/element5.png" />');
  
  // Initial level 2 elements
  $level2
    .append('<img class="element" src="images/element3.png" />')
    .append('<img class="element" src="images/element4.png" />')
    .append('<img class="element" src="images/element5.png" />');

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
    $level0.find('.element').each(level0RandomLocation);
    $level1.find('.element').each(level1RandomLocation);
    $level2.find('.element').each(level2RandomLocation);
  }
  element.src = elementPathPrefix + 0 + elementPathPostfix;
  
  // Set handlers for mousemove and click on landscape
  $(document).mousemove(changePositions);
  $landscape.click(moveForward);

}

/*
 * Calculate a random location for a level 0 element, set the element to that
 * location, and store that default location in the element's data
 */
function level0RandomLocation(index) {

  // Calculate random default location values
  var defaultTop = (Math.random() * level0Offset) + level0Top;
  var defaultLeft = (Math.random() * level0Offset) + triple[index] - level0ElementHalfWidth;
  
  // Set element to default location and store that location
  setStoreDefaultLocation($(this), defaultTop, defaultLeft);

}

/*
 * Calculate a random location for a level 2 element, set the element to that
 * location, and store that default location in the element's data
 */
function level1RandomLocation(index) {

  // Calculate random default location values
  var defaultTop = (Math.random() * level1Offset) + level1Top;
  var defaultLeft = (Math.random() * level1Offset) + double[index] - level1ElementHalfWidth;
  
  // Set element to default location and store that location
  setStoreDefaultLocation($(this), defaultTop, defaultLeft);

}

/*
 * Calculate a random location for a level 2 element, set the element to that
 * location, and store that default location in the element's data
 */
function level2RandomLocation(index) {

  // Calculate random default location values
  var defaultTop = (Math.random() * level2Offset) + level2Top;
  var defaultLeft = (Math.random() * level2Offset) + triple[index] - level2ElementHalfWidth;
  
  // Set element to default location and store that location
  setStoreDefaultLocation($(this), defaultTop, defaultLeft);

}

/*
 * Set and store default locations of an element
 */
function setStoreDefaultLocation(element, top, left) {

  // Set the element to the default location
  element.css({
    'top': top + 'px',
    'left': left + 'px'
  });
  
  // Store default location as data
  element
    .data('defaultTop', top)
    .data('defaultLeft', left);

}

/*
 * Set an element to a given location
 */
function setToLocation(element, top, left) {

  element.css({
    'top': top + 'px',
    'left': left + 'px'
  });

}

/**
 * Event handler for mousemove on the document; changes the positions of 
 * elements in the landscape based on mouse location and window size.
 */
function changePositions(event) {

  // Save the current window values
  var width = $(window).width();
  var halfWidth = width / 2;
  var height = $(window).height();
  var halfHeight = height / 2;
  
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
  
  /**
   * For element movement, treat the default location as corresponding to mouse
   * x and mouse y being at the center of the window.  Calculate all movement
   * based on that.
   */
  
  // Edit the position of level 0 elements - follow mouse x, follow mouse y
  $level0.find('.element').each(function() {
    var defaultTop = $(this).data('defaultTop');
    var defaultLeft = $(this).data('defaultLeft');
    var top, left;
    if (mouseY < halfHeight) {
      top = defaultTop + (mouseY / halfHeight * 5) - 5;
    }
    else {
      top = defaultTop + ((mouseY - halfHeight) / halfHeight * 5);
    }
    if (mouseX < halfWidth) {
      left = defaultLeft + (mouseX / halfWidth * 5) - 5;
    }
    else {
      left = defaultLeft + ((mouseX - halfWidth) / halfWidth * 5);
    }
    setToLocation($(this), top, left);
  });
  
  // Edit the position of level 1 elements - alternating mouse x, follow mouse y
  
  
  // Edit the position of level 2 elements - opposite mouse x, follow mouse y
  $level2.find('.element').each(function() {
    var defaultTop = $(this).data('defaultTop');
    var defaultLeft = $(this).data('defaultLeft');
    var top, left;
    if (mouseY < halfHeight) {
      top = defaultTop + (mouseY / halfHeight * 20) - 20;
    }
    else {
      top = defaultTop + ((mouseY - halfHeight) / halfHeight * 20);
    }
    if (mouseX < halfWidth) {
      left = defaultLeft + 20 - (mouseX / halfWidth * 20);
    }
    else {
      left = defaultLeft - ((mouseX - halfWidth) / halfWidth * 20);
    }
    setToLocation($(this), top, left);
  });
  
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