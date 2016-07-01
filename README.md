# Service Docs

## Purpose

This module is intended to provide a quick way to serve your module/project's documentation files as HTML.

## Installation

From your project's root, run the following.

```
npm install --save service-docs
```

## Prerequisites

* Your project is using the express framework.
* There is a **README.md** in the root of your project.

## Usage

Simply use this module as the function handler for one of your routes, such as ```/``` or ```/docs```

```javascript
const docs    = require("service-docs")
const express = require("express")

const app = express()

...

app.get("/", docs())
```

There are only a couple of options that can be configured for now.

* ```title``` - This is a *string* which simply gets used as the title of the HTML page which is generated. The default value is ```README```.
* ```readmePath``` - This should be the fully qualified path to the **README.md** file for your project. It's most common for this file to be in the root of your project, so you'll likely not have to change it if your project is ran from its root. The default value is ```process.cwd()+"/README.md"```.
* ```template``` - This is a *function* which takes the arguments *title* and *contents* and returns an HTML string. The default template uses a very basic Bootstrap template to wrap around the rendered output of the README's markdown, and also includes the JavaScript library *prism* for highlighting code syntax.

### Example with custom options

Here the title is changed (most common configuration) as well as the path to the **README.md** (because the program is not ran from the project's root).

```javascript
const docs    = require("service-docs")
const express = require("express")
const path    = require("path")

const app = express()

...

app.route("/docs").get(docs({title: "My awesome REST service", readmePath: path.resolve("./README.md")}))
```