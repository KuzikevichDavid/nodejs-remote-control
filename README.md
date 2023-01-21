# Node.js Websocket remote control
 
 Simple implementation of Websocket server for remote control. 

 For mouse operations and screen capture used [nutjs.dev](https://www.npmjs.com/package/@nut-tree/nut-js) library. 
 For image manipulations [jimp](https://www.npmjs.com/package/jimp).

 User interface for this server is [here](https://github.com/rolling-scopes-school/remote-control)

## How to install

 Download and install 18 LTS version of Node.js.

 ```bash
 git clone --branch dev-task4 https://github.com/KuzikevichDavid/nodejs-remote-control <path_where_to_clone>
```

```bash
 npm i
 ```

 Change value of `port` in `.env` file if needed. Default value of `port` is 8080.


 [Download](https://github.com/rolling-scopes-school/remote-control) the user interface.

## How to run

There are one CLI command `npm run start` that run websocket server on nodemon. 
Afte that run user interface using [this](https://github.com/rolling-scopes-school/remote-control/blob/main/README.md) instructions.
