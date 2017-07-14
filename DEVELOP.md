Dev Guidelines
==============

Use `yarn`.


## Cut a release

Leverages the standard-version workflow.
Tagged releases are built on CircleCI and automatically published to the npm registry.

```
$ yarn release
$ git push --follow-tags origin master
```
