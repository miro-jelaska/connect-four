# Connect 4
Connect Four game created using Pixi.js and TypeScript.

<img src="readme-resources/screenshot.png" alt="Prototype" width="400"/>

⏱ How much time did it took me? 3 days (which is also partially visible in commit history) without any prior practical experience with TypeScript nor Pixi.js. This time includes software development as well as creating gamplay concept, prototypes and, finally, game art.

# Technical details
## How to build and run?
To build the project use **webpack** and then use some **static server** to serve the web.

### Step-by-step guide
Here is the whole process for those who got lost or those who are just starting out.

1. (Prerequirements) Assuming that you have installed and configured [node.js](https://docs.npmjs.com/getting-started/installing-node) and [git](https://git-scm.com/) on your machine. And that you have cloned this repository.
2. Open your favorite shell and change directory to _src_ directory found at _./connect-four/src_
3. Install all npm modules (listed as dependencies in package.json).

   ```
   npm install
   ```
4. Run webpack to compile.

   ```
   npm run build
   ```
   
   and you should see something like this:
   
   ```
    Hash: 2a83d3d1cc776185f2cd
    Version: webpack 1.14.0
    Time: 2473ms
                      Asset     Size  Chunks             Chunk Names
    ./build/scripts/main.js  1.23 MB       0  [emitted]  main
        + 190 hidden modules
    ```
5. Install and use some static web server. E.g. install [Superstatic](https://github.com/firebase/superstatic), run superstatic at _./connect-four/src_. Shell output may look something like this
   
   ```
   Superstatic started.
   Visit http://localhost:3474 to view your app.
   ```
   
   Visit suggested web address to play the game.


# Game art design
Vector assets can be found in Adobe Illustrator file at  [readme-resources/Connect4-assets.ai](https://github.com/MiroslavJelaska/connect-four/blob/master/readme-resources/Connect4-assets.ai)

### Color scheme
* ![#FE5C2C](http://placehold.it/15/FE5C2C/000000?text=+) `#FE5C2C` (LightRed)
* ![#E0331D](http://placehold.it/15/E0331D/000000?text=+) `#E0331D` (DarkRed)
* ![#3DBAE3](http://placehold.it/15/3DBAE3/000000?text=+) `#3DBAE3` (LightBlue)
* ![#0D87C9](http://placehold.it/15/0D87C9/000000?text=+) `#0D87C9` (DarkBlue)
* ![#74675A](http://placehold.it/15/74675A/000000?text=+) `#74675A` (Brown)
* ![#FFB014](http://placehold.it/15/FFB014/000000?text=+) `#FFB014` (Yellow)
* ![#F1F2F2](http://placehold.it/15/F1F2F2/000000?text=+) `#F1F2F2` (LightGray)
