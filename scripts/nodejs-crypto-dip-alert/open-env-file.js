const fs = require('fs');
const path = require('path');
const openText = require('open-file-text-editor');

module.exports = async () => {
    const envFilePath = path.join(__dirname, '.env');
    const envSampleFilePath = path.join(__dirname, '.env.sample');
    const openEnvFile = async () => {
        
      console.warn(`If no .env file is opened, try running any of the following commands instead:
        
nano ${envFilePath}
open ${envFilePath}
notepad ${envFilePath}`);
      try {
        await openText(envFilePath);
      }
      catch {
        
      }
    }
    if (!fs.existsSync(envFilePath)) {
      fs.copyFileSync(envSampleFilePath, envFilePath);
    }
    await openEnvFile();
}