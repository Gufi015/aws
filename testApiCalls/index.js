var loadTest = require('load-testing')

const loadStarTest = () => {
  var args = {
    requestMethod: 'get',
    url: 'https://29cvt4fzml.execute-api.us-east-1.amazonaws.com/v1/employees',
    numberOfRequests: 100,
    waitBetweenCalls: 300,
    statusCodeToExpect: 200,
    runInParallel: true
  };

  loadTest.init(args);
};

loadStarTest();
