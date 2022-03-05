import fetch from "node-fetch";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    while(true) {
        const res = await fetch('http://localhost:8000');

        const date = new Date();
        if(res.status === 200) {
            console.log('OK at ' + date.toISOString());
        } else {
            console.error('Server is down! at '+ date.toISOString());
        }

        await sleep(1000);
    }
}

main();