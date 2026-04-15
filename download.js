import https from 'https';
import fs from 'fs';

const url = 'https://drive.google.com/uc?export=download&id=1NaRzcL6hqu-1gpP7GHPn10yEDuT5H0lf';

https.get(url, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    https.get(res.headers.location, (res2) => {
      let data = '';
      res2.on('data', chunk => data += chunk);
      res2.on('end', () => {
        console.log(data.substring(0, 1000));
        fs.writeFileSync('data.csv', data);
      });
    });
  } else {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(data.substring(0, 1000));
      fs.writeFileSync('data.csv', data);
    });
  }
});
