## How to use
App UI is divided into four sections, with elements listed left to right:

- **Browser address bar**. Displays ID of current folder. URL can be <br/>
copy-pasted and app will open correct folder, or, the root folder if <br/>
it doesn't exist. 
- **Header**
  - *Path to current folder*. Click on path segment to open that folder. 
  - *Filter input*. You can filter current view by entered name.
  - *Go to parent folder button*. 
  - *New folder button*. Click to open a dialog and enter name. You <br/>
  can use `Enter / Escape` to confirm / cancel.  
- **Body**
  - *Folders*. Click to select, double click to open. Folders with <br/>
  children display a different icon than empty folders.
- **Footer**
  - *Clear file system button*. App stores folders on browser <br/>
  `localstorage`, so the file system persists even after reloading <br/>
  or closing the page. Use this button to clear the file system.

## How to build and run

App build should run on `node v.10.15.0` or later. `npm` is required <br/> 
but should be bundled with node. Run the following commands from root <br/>
folder of the project.

---
### `npm install`

Downloads the dependencies.

---

### `npm start`

Runs the app in the development mode, includes server with hot reload on <br/>
file save. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

*or*

### `npm run build`

Builds optimized app for production to the `build` folder. This folder <br/>
can then be served using a web server of your choice. You can install <br/>
and use [serve](https://www.npmjs.com/package/serve) package for that:

- `npm install -g serve`

- `serve build`

---

## About

Since app focused on the concept of folders, I chose to use a simple, tried and <br/>
tested approach for the UI, similar to that found in a typical operating system. 

The app is built using react, and the official create-react-app npm package to <br/>
bootstrap it. 

Quickly tested on latest chrome, firefox, chrome for android and safari iOs. <br/>
Will not work on Internet Explorer (but should work fine on Edge) browser. 

#### Planned improvements (didn't make it in time):
- implement keyboard shortcuts and navigation;
- deal with very long folder names better (currently names are clipped after 3 lines);
- if last input was a touch input (not mouse), disable double, use single click;

Kasparas Anusauskas, 2019
