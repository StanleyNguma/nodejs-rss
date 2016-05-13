var http = require('http');
var postData = '{"username":"sasa","password":"Nevada@123"}'

var options = {
  hostname: 'countytest.riverbank.co.ke',
  port: 80,
  path: '/api/mpesa_validation',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

var req = http.request(options, (res) => {

  var responseCode = res.statusCode;

  switch (responseCode) {
    case 200:
    //console.log(responseCode);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      var responseData = JSON.parse(chunk);

      var responseMsg = responseData.message;
      var responseCode = responseData.data;
      var respnseResult = responseData.result;

      if (responseCode=='00') {
        // this is a success
        console.log('Success');
        console.log(responseMsg);

      } else {
        // this is an error

        console.log('Error');
        console.log(responseMsg);

      }


    });
    res.on('end', () => {
      console.log('+++++++++++++ End +++++++++++++')
    });

    break;

    case 404:
    console.log('Page not found');
    break;

    case 500:
    console.log('An error has occured');
    break;
    default:
    console.log('Could not Get the response code');
    break;

  }

});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();
