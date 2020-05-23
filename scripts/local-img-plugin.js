const path = require('path');
const fs = require('fs');

hexo.extend.filter.register('before_post_render', (data) => {
  const mdImgReg = /!{1}\[([^\[\]]*)\]\((\S*)\s?(?:".*")?\)/g;
  data.content = data.content.replace(mdImgReg, (_, label, href, str) => {
    try {
      href = String(new URL(href));
    } catch (e) {
      href = copyImg(data, href);
    }
    return `![${label}](${href})`;
  });
  return data;
});

function copyImg(data, imgPath) {
  const name = path.basename(imgPath);
  hexo.extend.generator.register(name, () => {
    return {
      path: path.join(data.path, name),
      data() {
        return fs.createReadStream(path.resolve(data.full_source, '../', imgPath));
      }
    };
  });
  return `./${name}`;
}
