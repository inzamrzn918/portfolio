const { exec } = require('child_process');
const path = require('path');

const deploy = async () => {
  const commands = [
    'npm run build',
    `scp -r ${path.join(__dirname, 'dist')}/* ${process.env.SSH_USER}@${process.env.SSH_HOST}:/var/www/html/`
  ];

  for (const command of commands) {
    console.log(`Executing: ${command}`);
    await new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error}`);
          reject(error);
          return;
        }
        console.log(stdout);
        resolve();
      });
    });
  }
};

deploy();