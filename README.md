# Wut Is My IP

Search and grab your machine's IP as fast/simple as possible

NodeJS interface

```javascript
import wutismyip from 'wutismyip'

wutismyip
.then(ip => console.log(`Ur IP is: ${ip}`))
.catch(err => console.error(err));
```

CLI Interface

```bash
node wutismyip/cli/index.js >> ip.txt
```