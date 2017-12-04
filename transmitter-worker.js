const Transmitter = require('xdrip-js');

const id = process.argv[2];

const getMessages = () => {
  return new Promise((resolve, reject) => {
    process.on('message', messages => {
      resolve(messages);
    });
    // TODO: consider adding a timeout here, with resolve([]), or reject
    process.send({msg: "getMessages"});
  });
};

console.log('kicking off');
const transmitter = new Transmitter(id, getMessages);

transmitter.on('glucose', glucose => {
  process.send({msg: "glucose", data: glucose});
});

transmitter.on('disconnect', process.exit);