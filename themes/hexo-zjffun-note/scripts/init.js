'use strict';

hexo.locals.set('zCategories', function () {
  var categroies = hexo.locals.get('posts').reduce(function (res, post) {
    var categoryTitleInfo = post.path.split('/');
    var categoryTitle = categoryTitleInfo[0];
    if (categoryTitleInfo[2] !== undefined) {
      if (!res[categoryTitle]) {
        res[categoryTitle] = [];
      }
      res[categoryTitle].push(post);
    }
    return res;
  }, {});

  Object.keys(categroies).forEach(function (key) {
    var element = categroies[key];

    categroies[key] = element.sort(function (a, b) {
      return a.updated.isBefore(b.updated) ? 1 : -1;
    });
  });

  return categroies;
});
