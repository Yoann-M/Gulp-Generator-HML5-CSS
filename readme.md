GULP GENERATOR HTML5 CSS DOCUMENTATION
======================================

I Dependency installation 
--------------------------

1. REPOSITORY
   * $ cd my-folder-path
2. BOWER
   * $ bower install
3. NPM
   * $ npm install


II Init project - Make this only at the first install !
-------------------------------------------------------

* $ gulp init


III Serve project
-----------------

Generate server, watch files and live reload

* $ gulp serve


VI Build project
----------------

Minify images, css and js files.. And all of other files in prod/ 

* $ gulp build



Others Informations
-------------------


> APP STRUCTURE AFTER $ gulp init-project

* app
  * -- index.html <- Modify this !
  * -- js
    * -- app.js <- Modify this !
  * -- css
    * -- app.css <- Modify this !
  * -- img  <- Add image and folder image !
  * -- components  <- Dont modify, all bower components
   

> VENDOR is A personal custom to init project

* vendor
  * -- index.html
  * -- img 
  * -- js
    * -- app.js
  * -- css
    * -- app.css