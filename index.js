"use strict"

const fs     = require("fs")
const marked = require("marked")

const defaults = {
	title: "README",
	readmePath: process.cwd()+"/README.md",
	template: (title, contents) => `<!DOCTYPE html>
<html>
<head>
	<title>${title}</title>

	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/themes/prism.min.css" crossorigin="anonymous">
</head>
<body>
<div class="container">${contents}</div>

<script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/prism.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/components/prism-json.js"></script>
</body>
</html>`
}

module.exports = options => {
	const config = Object.assign({}, defaults, options)

	return (req, res) => {
		marked.setOptions({
			langPrefix: "language-"
		})

		fs.readFile(config.readmePath, {encoding: "utf8"}, (err, readme) => {
			if (err) return res.status(500).end()

			const renderedReadme = marked(readme)
			res.send( config.template(config.title, renderedReadme) )
		})
	}
}