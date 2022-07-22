"reach 0.1";


export const main = Reach.App(() => {

  const Alice = Participant('Alice', {
    ready: Fun([], Null),
  });

  const Bob = API('Bob', {

  });

  init();
  Alice.only(() => {
    interact.ready()
  })
  Alice.publish()
  commit()
  exit()
 
});
