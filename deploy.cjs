const { exec } = require('child_process');
const path = require('path');

// Define the commands
const deployCommands = [
  'scp -r ./dist/* ubuntu@inzam.xyz:/home/ubuntu/dist/',
  'ssh ubuntu@inzam.xyz "sudo mv /home/ubuntu/dist/* /var/www/html/"',
  'ssh ubuntu@inzam.xyz "sudo chown -R www-data:www-data /var/www/html/"',
  'ssh ubuntu@inzam.xyz "sudo chmod -R 755 /var/www/html/"',
  'ssh ubuntu@inzam.xyz "sudo systemctl restart apache2"'
];

// Run deployment commands
deployCommands.forEach((command) => {
  exec(command, { cwd: path.resolve(__dirname) }, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command: ${command}`, err);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  });
});
