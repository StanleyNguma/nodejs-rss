var http = require('http');
var postData = '{"username":"sasa","password":"Nevada@123"}';

//postData = JSON.parse(postData);

var options = {
  hostname: 'rss.cnn.com',
  port: 80,
  path: '/rss/edition.rss',
  method: 'GET',
  headers: {
    'Content-Type': '',
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

      console.log(chunk);


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
