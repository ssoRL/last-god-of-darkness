# The Last God of the Darkness Site Manual

## Generating Content

The story is in tlgotd-content.md and if any changes are made to that they must be generated out before they'll start appearing. To generate new content run:

```node generateContent.js```

which should update tlgotd.html with your changes.

## Viewing the site locally

If you don't already have it, install [http-server](https://www.npmjs.com/package/http-server) by running

```npm install --global http-server```

then simply run `http-server` from the root diectory of this project