// Simple function to test
function add(a, b) {
  return a + b;
}
module.exports = add;

// Simple server so deploy has something to run
if (require.main === module) {
  require('http').createServer((req, res) => {
    res.end('Jenkins demo running');
  }).listen(3000);
}
