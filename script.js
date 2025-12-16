const SERVER_URL = "http://localhost:5000/api";

async function pingTest() {
    const start = performance.now();
    await fetch(`${SERVER_URL}/ping`);
    return Math.round(performance.now() - start);
}

async function downloadTest() {
    const start = performance.now();
    const res = await fetch(`${SERVER_URL}/download/10?cache=${Math.random()}`);
    const blob = await res.blob();
    const end = performance.now();

    const sizeBits = blob.size * 8;
    const timeSeconds = (end - start) / 1000;

    return (sizeBits / timeSeconds / 1_000_000).toFixed(2);
}

async function uploadTest() {
    const data = new Uint8Array(10 * 1024 * 1024); // 10MB
    const start = performance.now();

    await fetch(`${SERVER_URL}/upload`, {
        method: "POST",
        body: data,
    });

    const end = performance.now();
    const sizeBits = data.length * 8;
    const timeSeconds = (end - start) / 1000;

    return (sizeBits / timeSeconds / 1_000_000).toFixed(2);
}

async function startTest() {
    document.getElementById("ping").innerText = await pingTest();
    document.getElementById("download").innerText = await downloadTest();
    document.getElementById("upload").innerText = await uploadTest();
}
