import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);
//create test account
const startingBalance = stdlib.parseCurrency(100);
const accAlice = await stdlib.newTestAccount(startingBalance);

console.log('Launching....');
const ctcAlice = accAlice.contract(backend);
console.log('Starting Backends');

let done = false;
const attachers = [];
const startUsers = async () => {
  const Bobs = async(who) => {
    const acc = await stdlib.newTestAccount(startingBalance);
    const ctc = acc.contract(backend, ctcAlice.getInfo());
    console.log('A Bob user has successfully attached to the contract')
    attachers.push(acc.getAddress()); 
  };
  await Bobs('Bob1');
  await Bobs('Bob2');
  await Bobs('Bob3');
  while(!done){
    await stdlib.wait(1);
  }
  console.log(attachers);

};

await ctcAlice.p.Alice({
  ready: () => {
      console.log('Alice is Ready For Attachers')
      startUsers();
  }
});
console.log('GoodBye');
done = true;




