import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { createServer } from 'http';
import url from 'url';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const version = parseInt(readFileSync('version.txt'));
const versionStr = 'v' + version;

writeFileSync('version.txt', (version + 1).toString());

const server = createServer(async function (req, res) {
  const queryObject = url.parse(req.url, true).query;

  appendFileSync(
    '.logs/' + versionStr + '.log',
    '[' +
      new Date().toISOString() +
      ' ' +
      queryObject.id +
      '] Received request for ' +
      versionStr +
      ' at ' +
      req.url +
      '\n'
  );

  await sleep(10 * 1000);

  res.write(versionStr);
  appendFileSync(
    '.logs/' + versionStr + '.log',
    '[' +
      new Date().toISOString() +
      ' ' +
      queryObject.id +
      '] Ended request for ' +
      versionStr +
      ' at ' +
      req.url +
      '\n'
  );

  res.end();
}).listen(3000);

process.on('SIGINT', () => {
  console.log(`[${versionStr}] SIGINT received`);

  appendFileSync(
    '.logs/signal.log',
    '[' + new Date().toISOString() + '] SIGINT \n'
  );

  server.close((err) => {
    appendFileSync(
      '.logs/signal.log',
      '[' +
        new Date().toISOString() +
        '] Closed server ' +
        (err ? err.message : '') +
        ' \n'
    );

    process.exit(err ? 1 : 0);
  });
});
