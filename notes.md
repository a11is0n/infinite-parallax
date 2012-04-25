Notes
=====

4.24.2012
---------

  Today when I was placing temporary images in the three levels, I noticed
  that if you scale an image with a transform, and then absolutely position it,
  it actually positions it based on the original size.  I Googled this problem
  but didn't find much; the only thing I found was a [jQuery UI bug 
  report](http://bugs.jqueryui.com/ticket/7865 "jQuery UI bug report) about
  this problem that seemed like it ended up not being related to jQuery.  
  
  However, it did have a solution: if you set the transform-origin to 0px 0px, 
  it will absolute position the images based on the scaled size!