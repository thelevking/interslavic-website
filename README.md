# New website for Interslavic language

<img src="https://img.shields.io/badge/dynamic/json?color=brightgreen&label=Node&query=engines.node&url=https%3A%2F%2Fraw.githubusercontent.com%2Felderjs%2Ftemplate%2Fmaster%2Fpackage.json" alt="Node version (see package.json)" />

Rework of [Jan van Steenbergen's website on Interslavic](http://steen.free.fr/interslavic/) with modern and responsive design, interactive tables, localisation possibilities and more.

Technical details:
- Uses [Elder.js](https://elderguide.com/tech/elderjs/). The code structure is based on the [Elder.js template](https://github.com/elderjs/template).
- Uses [Svelte](https://svelte.dev/) for HTML/JS/CSS code.
- Uses Markdown for text code.
- Uses JS modules from [Interslavic dictionary website](https://github.com/sonic16x/interslavic) for table data.

## Acknowledgements

Jan van Steenbergen maintained the original English website since 2006 and is the copyright owner of its text. Interslavic translations share his copyright (non-free) and copyright of the translators (under MIT License). Jan van Steenbergen and Interslavic community did not endorse or authorize the production of this website.

## Get started

[Node.js](https://nodejs.org/en/) is required.

Clone this repository. Install dependencies by running this command in command line:

```bash
npm install
```

To start a local server, run:

```bash
npm start # or npm run dev
```

Navigate to [localhost:3000](http://localhost:3000). You should see this website running.

This spawns a development server, so you can simply edit a file in `src`, save it, and reload the page to see your changes.