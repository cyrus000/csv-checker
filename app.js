const http = require('https');


const states = ['NJ', 'NY'];
const cities = ['TROY'];

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
const options = {
  host: 'www.cvs.com',
  path: '/immunizations/covid-19-vaccine.vaccine-status.json'
};

callback = function(response) {
  let str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {

    const json = JSON.parse(str);

    states.forEach((state) => {
      const data = json.responsePayloadData.data[state]
      for(let i =0;i<data.length;i++) {

        if(!cities) {
          if (data[i].status !== 'Fully Booked') {
            console.log(`${data[i].state},${data[i].city},${data[i].status}`)
          }
        } else {

          if (data[i].status !== 'Fully Booked' && cities.includes(data[i].city)) {
            console.log(`${data[i].state},${data[i].city},${data[i].status}`)
          }
        }

      }

    })
  });
};

http.request(options, callback).end();
