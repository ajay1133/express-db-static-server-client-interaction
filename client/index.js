async function fetchUrl(url, options) {
    try {
        const res = await fetch(url, options);
        return res.json();
    } catch (e) {
        console.log(e);
        return 'Error fetching data';
    }
}

async function init(params) {
    const rootElem = document.getElementById('root');
    if (!rootElem) {
        return alert('Error: Root dov not initialized in html');
    }
    rootElem.innerHTML = 'Loading (Fetching api result) ...';
    // Define fetch url
    const urlObj = new URL('http://localhost:3000/api/v1/get-item');
    // Attach url search params to fetch url
    urlObj.search = new URLSearchParams([...params]).toString();
    const options = {
        method: 'GET'
    };
    // Try-catch request 
    let preText = '';
    let resBodyObject = null; 
    const maxStrDisplayLength = 1000;
    const start = new Date();
    try {
        resBodyObject = await fetchUrl(urlObj, options);
        console.log('Start of response = /n/r -----', );
        console.dir(resBodyObject, { depth: null });
        console.log('---- End of response = /n/r', );
        preText = `
            Successfully fetched api response. 
            Open inspect browser console to view the complete response.
            Partial success response trimmed at ${maxStrDisplayLength} characters in JSON string format 
        `;
    } catch (e) {
        console.error(e);
        preText = `
            Error in fetching api response.
            Open inspect browser console to view thw error message.
            Partial error response trimmed at ${maxStrDisplayLength} characters in JSON string format
        `;
        resBodyObject = e;
    } finally {
        const end = new Date();
        rootElem.innerHTML = preText + '<br><br>' +
            JSON.stringify(resBodyObject).substring(0, maxStrDisplayLength - 1) + 
            `<br><br>Time taken: ${start.getTime() - end.getTime()} ms`;
    } 
}
