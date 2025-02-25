let contactmaster_cart = [];

function contactmaster_cart1() {
    fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=CUSTOMER_DATA_TABLE")
        .then(response => response.json())
        .then(data => {
            contactmaster_cart = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('contactmaster_cart', JSON.stringify(contactmaster_cart));
            sessionStorage.setItem('custom_attribute_cart', JSON.stringify(contactmaster_cart));
            console.log(contactmaster_cart)
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            segments_cart1();
        });
}

let segments_cart = [];

function segments_cart1() {
    fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=SEGMENTS")
        .then(response => response.json())
        .then(data => {
            segments_cart = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('segments_cart', JSON.stringify(segments_cart));
            sessionStorage.setItem('segments_cart2', JSON.stringify(segments_cart));
            console.log(segments_cart)
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            blacklist_cart1();
        });
}

let blacklist_cart = [];

async function blacklist_cart1() {

    const url1 = "https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=CUSTOMER_DATA_TABLE";
    const url2 = "https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=OPT-IN_DATA_TABLE";

    try {
        const [response1, response2] = await Promise.all([
            fetch(url1).then(res => res.json()),
            fetch(url2).then(res => res.json())
        ]);

        const data1 = response1.slice(1); // Skipping header row
        const data2 = response2.slice(1);

        const mergedData = data1.map(row1 => {
            const matchingRow2 = data2.find(row2 => row2[1] === row1[0]); // Matching by CUSTOMER_ID
            return matchingRow2 ? [...row1, ...matchingRow2] : [...row1, ...Array(data2[0].length).fill(null)];
        });

        blacklist_cart = mergedData
        sessionStorage.setItem('blacklist_cart', JSON.stringify(blacklist_cart));
        console.log(blacklist_cart)
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        product_cart1();
    }
}



// Fetch data from the Apps Script URL only once
async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=PRODUCT_DATA_TABLE');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

async function product_cart1() {
    let data = await fetchData();
    sessionStorage.setItem('data2', JSON.stringify(data));
    console.log(data)
    whatsappcontent_cart1();
}

let whatsappcontent_cart = [];

function whatsappcontent_cart1() {

    fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=WHATSAPP_TEMPLATES") 
        .then(response => response.json())
        .then(data => {
            const whatsappcontent_cart = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('whatsappcontent_cart', JSON.stringify(whatsappcontent_cart));
            console.log(whatsappcontent_cart)
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            campaignsummary_cart1();
        });
}


let campaignsummary_cart = [];

function campaignsummary_cart1() {
    fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=CAMPAIGN_DATA_TABLE")
        .then(response => response.json())
        .then(data => {
            campaignsummary_cart = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('campaignsummary_cart', JSON.stringify(campaignsummary_cart));
            console.log(campaignsummary_cart)
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            order_cart();
        });
}


let order_cart1 = [];

function order_cart() {
    fetch("https://script.google.com/macros/s/AKfycbzXWL8oN0knVFt2ZV5w6CVSPvZ2iHtToxhQgqova7AobgeP6qEhp50R8lwVNLEndxSp/exec?sheet=ORDER_DATA_TABLE")
        .then(response => response.json())
        .then(data => {
            order_cart1 = data.slice(1); // Store data in cart, skipping header row
            sessionStorage.setItem('order_cart', JSON.stringify(order_cart1));
            console.log(order_cart1)
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            login();
        });
}
