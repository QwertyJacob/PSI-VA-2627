window.MathJax = {
  // The course notes use \coloneqq (mathtools), which the default TeX input
  // package set does not know: without this it renders as red raw TeX.
  loader: { load: ['[tex]/mathtools'] },
  tex: {
    packages: { '[+]': ['mathtools'] },
    inlineMath: [['\\(', '\\)'], ['$', '$']],
    displayMath: [['\\[', '\\]'], ['$$', '$$']],
    processEscapes: true,
    processEnvironments: true,
    tags: 'ams'
  },
  options: {
    ignoreHtmlClass: '.*',
    processHtmlClass: 'arithmatex'
  }
};

document$.subscribe(function () {
  // Loading an extra TeX package defers MathJax's startup until the package has
  // been fetched, so wait for it: `startup.output` is still null when the first
  // document$ fires, and touching it then throws.
  var mj = window.MathJax;
  if (!mj.startup || !mj.startup.promise) return;
  mj.startup.promise.then(function () {
    mj.startup.output.clearCache();
    mj.typesetClear();
    mj.texReset();
    return mj.typesetPromise();
  });
});
