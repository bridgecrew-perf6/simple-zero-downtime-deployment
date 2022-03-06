import fetch from 'node-fetch';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  let counter = 1;
  while (true) {
    const date = new Date();

    fetch('http://localhost:8000?id=' + counter)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.body.read() + ' at ' + date.toISOString());
        } else {
          console.error('Server is down! at ' + date.toISOString());
        }
      })
      .catch((_) => {
        console.error('Server is down! at ' + date.toISOString());
      });

    counter++;

    await sleep(1000);
  }
}

main();
