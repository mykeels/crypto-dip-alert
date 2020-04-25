const { promises: fs } = require('fs');
const path = require('path');

module.exports = (async () => {
  const files = await fs.readdir(path.join(__dirname));
  const filteredFiles = files.filter(file => file.endsWith('.notification.js'));

  return filteredFiles.map(file => require(`./${file}`));
})();
