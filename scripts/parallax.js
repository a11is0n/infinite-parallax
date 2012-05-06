/**
 * Variables for images used in this experiment; paths are relative to the main
 * folder.  Element prefixes are followed by a number starting at 0.
 */
var backgroundPath = 'images/background.png';
var backgroundHeight;
var elementPathPrefix = 'images/element';
var elementPathPostfix = '.png';
var elementCount = 6;

/**
 * Variables for elements in the landscape
 */
var $landscape, $levelf, $level0, $level1, $level2;
var landscapeHeight;
var backgroundMax;
var levelWidth;
var elementWidth, elementHeight;
var $levelfElements, $level0Elements, $level1Elements, $level2Elements;

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
var level1Width, level1Height;
var level2Width, level2Height;
var level0ElementHalfWidth;
var level1ElementHalfWidth;
var level2ElementHalfWidth;
var frontCount = 3; // Start with 3 elements in front level
var level0MaxMove = 5;
var level1MaxMove = 10;
var level2MaxMove = 20;
var level1WithMouse = true; // Keep track of level 1 movement - alternate
var levelfDone = true;
var level0Done = true;
var level1Done = true;
var level2Done = true;

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
  $landscape = $('div#landscape');
  $levelf = $landscape.find('div.level#level-f');
  $level0 = $landscape.find('div.level#level-0');
  $level1 = $landscape.find('div.level#level-1');
  $level2 = $landscape.find('div.level#level-2');
  landscapeHeight = $landscape.height();
  levelWidth = $landscape.find('div.level').width();
  
  // Set the variables for manipulating elements in the landscape
  level2Top = 0;
  
  // Initial level 0 elements
  $level0
    .append('<img class="element" src="images/element0.png" />')
    .append('<img class="element" src="images/element1.png" />')
    .append('<img class="element" src="images/element2.png" />');
  $level0Elements = $level0.find('.element');
  
  // Initial level 1 elements
  $level1
    .append('<img class="element" src="images/element0.png" />')
    .append('<img class="element" src="images/element5.png" />');
  $level1Elements = $level1.find('.element');
  
  // Initial level 2 elements
  $level2
    .append('<img class="element" src="images/element3.png" />')
    .append('<img class="element" src="images/element4.png" />')
    .append('<img class="element" src="images/element5.png" />');
  $level2Elements = $level2.find('.element');

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
    // Starting x-locations of three-element levels
    var third = levelWidth / 3;
    triple[0] = (third / 2);
    triple[1] = triple[0] + third;
    triple[2] = triple[1] + third;
    // Starting x-locations of two-element levels
    var half = levelWidth / 2;
    double[0] = third;
    double[1] = third * 2;
    level1Width = elementWidth * level1Scale;
    level1Height = elementHeight * level1Scale;
    level2Width = elementWidth * level2Scale;
    level2Height = elementHeight * level2Scale;
    level0ElementHalfWidth = elementWidth / 2;
    level1ElementHalfWidth = level1Width / 2;
    level2ElementHalfWidth = level2Width / 2;
    // Set initial element sizes/positions here since they depend on above
    $level0Elements.each(function(index) {
      $this = $(this);
      var location = getStoreLevel0RandomLocation($this, index);
      setToLocation($this, location.top, location.left);
    });
    $level1Elements
      .width(level1Width)
      .height(level1Height)
      .each(function(index) {
        $this = $(this);
        var location = getStoreLevel1RandomLocation($this, index);
        setToLocation($this, location.top, location.left);
      });
    $level2Elements
      .width(level2Width)
      .height(level2Height)
      .each(function(index) {
        $this = $(this);
        var location = getStoreLevel2RandomLocation($this, index);
        setToLocation($this, location.top, location.left);
      });
  }
  element.src = elementPathPrefix + 0 + elementPathPostfix;
  
  // Set handlers for mousemove and click on landscape
  $(document).mousemove(changePositions);
  $landscape.click(moveForward);

}

/*
 * Calculate a random location for a level 0 element, store that default 
 * location in the element's data, and return the values in an object
 */
function getStoreLevel0RandomLocation(element, index) {

  // Calculate random default location values
  var defaultTop = (Math.random() * level0Offset) + level0Top;
  var startLocation;
  // Assume that frontCount is either 2 or 3
  if (frontCount === 2) {
    startLocation = double[index];
  }
  else {
    startLocation = triple[index];
  }
  var defaultLeft = (Math.random() * level0Offset) + startLocation - level0ElementHalfWidth;
  
  // Store the default location
  setDefaultLocation(element, defaultTop, defaultLeft);
  
  // Return the values
  return {'top': defaultTop, 'left': defaultLeft};

}

/*
 * Calculate a random location for a level 2 element, store that default
 * location in the element's data, and return the values in an object
 */
function getStoreLevel1RandomLocation(element, index) {

  // Calculate random default location values
  var defaultTop = (Math.random() * level1Offset) + level1Top;
  var startLocation;
  // This level has 2 elements if frontCount is 3 and 3 elements if frontCount is 2
  if (frontCount === 3) {
    startLocation = double[index];
  }
  else {
    startLocation = triple[index];
  }
  var defaultLeft = (Math.random() * level1Offset) + startLocation - level1ElementHalfWidth;
  
  // Store the default location
  setDefaultLocation(element, defaultTop, defaultLeft);
  
  // Return the values
  return {'top': defaultTop, 'left': defaultLeft};

}

/*
 * Calculate a random location for a level 2 element, store that default 
 * in the element's data, and return the values in an object
 */
function getStoreLevel2RandomLocation(element, index) {

  // Calculate random default location values
  var defaultTop = (Math.random() * level2Offset) + level2Top;
  var startLocation;
  // Assume that frontCount is either 2 or 3
  if (frontCount === 2) {
    startLocation = double[index];
  }
  else {
    startLocation = triple[index];
  }
  var defaultLeft = (Math.random() * level2Offset) + startLocation - level2ElementHalfWidth;
  
  // Store the default location
  setDefaultLocation(element, defaultTop, defaultLeft);
  
  // Return the values
  return {'top': defaultTop, 'left': defaultLeft};

}

function setDefaultLocation(element, top, left) {

  // Store default location as data
  element
    .data('defaultTop', top)
    .data('defaultLeft', left);

}

/*
 * Set an element to a given location.
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

  // Check if in the middle of moving forward - if so, don't change positions
  if (!levelfDone || !level0Done || !level1Done || !level2Done) {
    return;
  }

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
  
  // Edit the position of level 0 elements - follow mouse x and y
  $level0Elements.each(function() {
    var defaultTop = $(this).data('defaultTop');
    var defaultLeft = $(this).data('defaultLeft');
    var top, left;
    top = getTopWithMouse(mouseY, halfHeight, defaultTop, level0MaxMove);
    left = getLeftWithMouse(mouseX, halfWidth, defaultLeft, level0MaxMove);
    setToLocation($(this), top, left);
  });
  
  // Edit the position of level 1 elements - alternate mouse x and y
  $level1Elements.each(function() {
    var defaultTop = $(this).data('defaultTop');
    var defaultLeft = $(this).data('defaultLeft');
    var top, left;
    var left;
    if (level1WithMouse) {
      top = getTopWithMouse(mouseY, halfHeight, defaultTop, level1MaxMove);
      left = getLeftWithMouse(mouseX, halfWidth, defaultLeft, level1MaxMove);
    }
    else {
      top = getTopOppMouse(mouseY, halfHeight, defaultTop, level1MaxMove);
      left = getLeftOppMouse(mouseX, halfWidth, defaultLeft, level1MaxMove);
    }
    setToLocation($(this), top, left);
  });
  
  // Edit the position of level 2 elements - opposite mouse x and y
  $level2Elements.each(function() {
    var defaultTop = $(this).data('defaultTop');
    var defaultLeft = $(this).data('defaultLeft');
    var top = getTopOppMouse(mouseY, halfHeight, defaultTop, level2MaxMove);
    var left = getLeftOppMouse(mouseX, halfWidth, defaultLeft, level2MaxMove);
    setToLocation($(this), top, left);
  });
  
}

/*
 * Returns the top value for an element based on the current mouse y and half
 * of the window height.  Follows the vertical movement of the mouse.
 */
function getTopWithMouse(mouseY, halfHeight, defaultTop, offset) {

  if (mouseY < halfHeight) {
    return defaultTop + (mouseY / halfHeight * offset) - offset;
  }
  else {
    return defaultTop + ((mouseY - halfHeight) / halfHeight * offset);
  }

}

/*
 * Returns the top value for an element based on the current mouse y and half
 * of the window height.  Moves opposite to the vertical movement of the mouse.
 */
function getTopOppMouse(mouseY, halfHeight, defaultTop, offset) {

  if (mouseY < halfHeight) {
    return defaultTop + offset - (mouseY / halfHeight * offset);
  }
  else {
    return defaultTop - ((mouseY - halfHeight) / halfHeight * offset);
  }

}

/*
 * Returns the left value for an element based on the current mouse x and half
 * of the window width.  Follows the horizontal movement of the mouse.
 */
function getLeftWithMouse(mouseX, halfWidth, defaultLeft, offset) {

  if (mouseX < halfWidth) {
    return defaultLeft + (mouseX / halfWidth * offset) - offset;
  }
  else {
    return defaultLeft + ((mouseX - halfWidth) / halfWidth * offset);
  }

}

/*
 * Returns the left value for an element based on the current mouse x and half 
 * of the window width.  Moves opposite to the horizontal movement of the mouse.
 */
function getLeftOppMouse(mouseX, halfWidth, defaultLeft, offset) {

  if (mouseX < halfWidth) {
    return defaultLeft + offset - (mouseX / halfWidth * offset);
  }
  else {
    return defaultLeft - ((mouseX - halfWidth) / halfWidth * offset);
  }

}

/*
 * Event handler for click on the landscape; manipulates elements in the
 * landscape to simulate moving "forward" into the landscape.
 */
function moveForward(event) {

  // Moving foward not done yet
  levelfDone = false;
  level0Done = false;
  level1Done = false;
  level2Done = false;

  // Count of elements in front level toggles between 2 and 3
  frontCount = (frontCount === 2) ? 3 : 2;
  
  // Movement of level 1 toggles
  level1WithMouse = !level1WithMouse;
  
  /*
   * Shift all the current elements forward a level.  Level f is solely used
   * to hold the current level 0 elements until they are removed.
   */
  $levelfElements = $level0Elements;
  $levelf.append($levelfElements);
  $level0Elements = $level1Elements;
  $level0.append($level0Elements);
  $level1Elements = $level2Elements;
  $level1.append($level1Elements);
  
  /*
   * Fade out and remove level f elements, animate the size and position changes
   * of level 0 and 1 elements, and fade in level 2 elements
   */
  $levelfElements.fadeOut('slow', function() {
    $(this).remove();
    levelfDone = true;
  });
  $level0Elements.each(function(index) {
    $this = $(this);
    var location = getStoreLevel0RandomLocation($this, index);
    $this.animate({
      'width': elementWidth,
      'height': elementHeight,
      'top': location.top,
      'left': location.left
    }, 'slow', function() {
      level0Done = true;
    });
  });
  $level1Elements.each(function(index) {
    $this = $(this);
    var location = getStoreLevel1RandomLocation($this, index);
    $this.animate({
      'width': level1Width,
      'height': level1Height,
      'top': location.top,
      'left': location.left
    }, 'slow', function() {
      level1Done = true;
    });
  });
  for (var i = 0; i < frontCount; i++) {
    var rand = Math.floor(Math.random() * elementCount);
    $level2.append('<img class="element" src="images/element' + rand + '.png" />')
  }
  $level2Elements = $level2.find('.element');
  $level2Elements
    .width(level2Width)
    .height(level2Height)
    .hide()
    .each(function(index) {
      $this = $(this);
      var location = getStoreLevel2RandomLocation($this, index);
      setToLocation($this, location.top, location.left);
    })
    .fadeIn('slow', function() {
      level2Done = true;
    });

}