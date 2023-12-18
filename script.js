getData();

async function getData() {
const response = await fetch('https://raw.githubusercontent.com/RFUNN/JSON_Data/main/climate.json');
const data = await response.json();
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Id = 16;
const cityData = data.find(user => user.id === Id);


const city = cityData.city;

const labels = cityData.monthlyAvg.map((entry, i) => month[i]);
const high = cityData.monthlyAvg.map(entry => entry.high);
const low = cityData.monthlyAvg.map(entry => entry.low);

Chart.defaults.global.defaultFontStyle = 'bold';
Chart.defaults.global.defaultFontFamily = 'Comic Sans MS';
Chart.defaults.global.defaultFontColor = "#000";
Chart.defaults.global.defaultFontSize = 30;

new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
    labels: labels,
    datasets: [
    {
    label: "Maximum temperature",
    borderColor: "blue",
    data: high
    },
    {
    label: "Minimum temperature",
    borderColor: "purple",
    data: low
    }
    ]
    },
    options: {
    legend: { display: true },
    title: {
    display: true,
    text: 'Maximum and minimum temperatures of the month'
    }
    }
});


const cityNameElement = document.createElement("h2");
cityNameElement.textContent = city;
document.getElementById("line-chart").before(cityNameElement);

tableData(cityData.monthlyAvg, month);
}

function tableData(monthlyAvg, month) {
let tableHTML = "<tr><th>Месяц</th><th>High</th><th>Low</th></tr>";

for (let i = 0; i < monthlyAvg.length; i++) {
tableHTML += `<tr><td>${month[i]}</td><td>${monthlyAvg[i].high}</td><td>${monthlyAvg[i].low}</td></tr>`;
}

document.getElementById("my_data").innerHTML = tableHTML;
}