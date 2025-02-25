// Retrieve stored user name or set default
const martechFirstName = sessionStorage.getItem("MartechFirstName") || "User";
const cardTitle = document.querySelector("h5.card-title.text-primary");
if (cardTitle) {
    cardTitle.innerHTML = `Congratulations ${martechFirstName}! 🎉`;
}

// Retrieve and parse order data
const orderCart = JSON.parse(sessionStorage.getItem("order_cart") || "[]");
const todayDate = new Date().toISOString().split('T')[0];

// Calculate today's total sales
let totalSalesToday = 0;
const dateCounts2 = {};

orderCart.forEach(row => {
    if (Array.isArray(row) && row.length > 5) {
        const orderDate = row[2]?.split('T')[0];
        const orderAmount = Number(row[5]) || 0;

        if (orderDate === todayDate) {
            totalSalesToday += orderAmount;
        }
        
        if (orderDate) {
            dateCounts2[orderDate] = (dateCounts2[orderDate] || 0) + 1;
        }
    }
});

// Update sales total in the DOM
const salesInfoElement = document.querySelector("p.mb-4 span.fw-bold");
if (salesInfoElement) {
    salesInfoElement.textContent = `₹${totalSalesToday}`;
}

// Update total orders in the DOM
const totalOrders = orderCart.length;
const orderCountElement = document.querySelector(".card-title.text-nowrap.mb-1");
if (orderCountElement) {
    orderCountElement.textContent = totalOrders;
}

// Calculate order growth
const dates2 = Object.keys(dateCounts2).sort();
if (dates2.length >= 2) {
    const [yesterday, today] = dates2.slice(-2);
    const [yesterdayCount, todayCount] = [dateCounts2[yesterday] || 0, dateCounts2[today] || 0];

    let orderGrowth = "0%", orderGrowthHtml;
    if (yesterdayCount === 0) {
        orderGrowth = todayCount > 0 ? "100% increase" : "0%";
        orderGrowthHtml = todayCount > 0
            ? '<small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> +100%</small>'
            : '<small class="text-muted fw-semibold">0%</small>';
    } else {
        const growthRate = (((todayCount - yesterdayCount) / yesterdayCount) * 100).toFixed(2);
        orderGrowth = `${Math.abs(growthRate)}%`;
        orderGrowthHtml = growthRate >= 0
            ? `<small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> ${growthRate}%</small>`
            : `<small class="text-danger fw-semibold"><i class="bx bx-down-arrow-alt"></i> ${growthRate}%</small>`;
    }

    console.log("Order Growth: ", orderGrowth);
    const orderGrowthElement = document.querySelector(".order-growth-rate");
    if (orderGrowthElement) {
        orderGrowthElement.innerHTML = orderGrowthHtml;
    }
} else {
    console.log("Not enough data to calculate order growth.");
}

// Retrieve and parse contact data
const contactMaster = JSON.parse(sessionStorage.getItem("contactmaster_cart") || "[]");
const totalContacts = contactMaster.length;

// Update total contacts in the DOM
const contactCountElement = document.querySelector(".card-title.mb-2");
if (contactCountElement) {
    contactCountElement.textContent = totalContacts;
}

// Calculate contact growth
const dateCounts = {};
contactMaster.forEach(contact => {
    const regDate = contact[4]?.split('T')[0];
    if (regDate) {
        dateCounts[regDate] = (dateCounts[regDate] || 0) + 1;
    }
});

const dates = Object.keys(dateCounts).sort();
if (dates.length >= 2) {
    const [yesterday, today] = dates.slice(-2);
    const [yesterdayCount, todayCount] = [dateCounts[yesterday] || 0, dateCounts[today] || 0];

    let contactGrowth = "0%", contactGrowthHtml;
    if (yesterdayCount === 0) {
        contactGrowth = todayCount > 0 ? "100% increase" : "0%";
        contactGrowthHtml = todayCount > 0
            ? '<small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> +100%</small>'
            : '<small class="text-muted fw-semibold">0%</small>';
    } else {
        const growthRate = (((todayCount - yesterdayCount) / yesterdayCount) * 100).toFixed(2);
        contactGrowth = `${Math.abs(growthRate)}%`;
        contactGrowthHtml = growthRate >= 0
            ? `<small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> ${growthRate}%</small>`
            : `<small class="text-danger fw-semibold"><i class="bx bx-down-arrow-alt"></i> ${growthRate}%</small>`;
    }

    console.log("Contact Growth: ", contactGrowth);
    const growthElement = document.querySelector(".contact-growth-rate");
    if (growthElement) {
        growthElement.innerHTML = contactGrowthHtml;
    }
} else {
    console.log("Not enough data to calculate contact growth.");
}
