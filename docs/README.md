This docs directory houses files for generating the reference docs
using JSDoc, which we then publish to the gh-pages branch to host via
Github pages.

```
$ jsdoc -c docs/conf.json
$ git checkout gh-pages
$ mv out docs
$ git commit -m "Updated docs"
$ git push origin gh-pages
```