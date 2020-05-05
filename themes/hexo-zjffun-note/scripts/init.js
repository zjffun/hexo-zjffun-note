'use strict';

hexo.locals.set('zCategories', function () {
  return hexo.locals.get('posts').reduce(function (res, post) {
    var categoryTitle = post.path.split('/');
    if (categoryTitle[2] !== undefined) {
      if (!res[categoryTitle[0]]) {
        res[categoryTitle[0]] = [];
      }
      res[categoryTitle[0]].push(post);
    }
    return res;
  }, {});
});
