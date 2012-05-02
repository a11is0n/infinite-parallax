Notes
=====

04.24.2012
----------

Today when I was placing temporary images in the three levels, I noticed
that if you scale an image with a transform, and then absolutely position it,
it actually positions it based on the original size.  I Googled this problem
but didn't find much; the only thing I found was a [jQuery UI bug 
report](http://bugs.jqueryui.com/ticket/7865 "jQuery UI bug report") about
this problem that seemed like it ended up not being related to jQuery.  

However, it did have a solution: if you set the transform-origin to 0px 0px, 
it will absolute position the images based on the scaled size!
  
05.01.2012
----------

I added movement to the levels today.  Each element in the levels have a default
location that is randomly generated when it is first inserted into the DOM.  I
decided that this would be the location that corresponds to the mouse being at
the center of the window - mouseX at width/2, mouseY at height/2.  The change in
position on mousemove is based on that default location and an offset distance
for each level.

I really am not sure what kind of movement will make it look 3D, so I'm kind of 
guessing right now.  I decided that the front level would move in the same 
horizontal direction as the mouse and the back level would move opposite to the 
mouse.  However I couldn't decide about the middle level, so I just decided to 
make it alternate each time you move "forward".