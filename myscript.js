function loadData() {
    $.getJSON('https://my.api.mockaroo.com/samianowa?key=b560a580', function(data) {

    let table = $('<table>');

  
    let tr = $('<tr>');
    for (let key in data[0]) {
      let th = $('<th>');
      th.html(key);
      tr.append(th);
    }
    table.append(tr); 
    $.each(data, function(index, row) {
      let tr = $('<tr>');
      for (let key in row) {
        let td = $('<td>');
        td.html(row[key]);
        tr.append(td);
      }
      table.append(tr);
    });
let vip = 0;
let nievip = 0;
$.each(data, function(index, row) {
  if (row.Gracz_Vip == 'M') {
    vip++;
    } else {
      nievip++;
    }
    });
let chartData = {
labels: ['Gracz vip', 'Gracz nie vip'],
datasets: [{
label: 'Ilość osób',
data: [vip, nievip],
borderWidth: 1 ,
backgroundColor: ['rgb(255, 204, 102)', 'rgb(255, 204, 102)'],
barThickness: 50,
}],
};
let chartOptions = {
scales: {
y: {
beginAtZero: true
    }    
}};

const ctx = document.getElementById('myChart');
   ctx.width = 30;
   ctx.height = 15;  
new Chart(ctx, {
  type: 'bar',
  data: chartData,
  
  
  });
   
let countryCount = new Map();
$.each(data, function(index, row) {
  let count = 0;
    if (countryCount.has(row.Region)) {
    count = countryCount.get(row.Region);
    }
      countryCount.set(row.Region, count + 1);
    });

console.log(countryCount.keys())
     
let pieChartData = {
labels: Array.from(countryCount.keys()),
datasets: [{
label: 'Ilość graczy',
data: Array.from(countryCount.values()),
backgroundColor: ['rgb(255, 204, 102)', 'rgb(51, 33, 0)', 'rgb(255, 210, 128)', 'rgb(0, 0, 0)','rgb(255, 153, 51)' , 'rgb(255, 242, 230)'],
hoverOffset: 4, 
}]};

let pieChartOptions = {
responsive: false,
};
const pieCtx = document.getElementById('myPieChart').getContext('2d');;    
new Chart(pieCtx, {
  type: 'pie',
  data: pieChartData,
  options: pieChartOptions
});
});
}


