function EventEmitter() {
    // will be map with eventName as key, and value is array with objects
    // having id and cb function
    this.subscriptions = new Map();
    //unique identifier generator
    let id = 0;
  
    this.subscribe = function (eName, fn) {
      const newId = id++;
  
      if (this.subscriptions.has(eName)) {
        let existingSubs = this.subscriptions.get(eName);
        let newSubs = existingSubs.concat({
          id: newId,
          fn,
        });
        this.subscriptions.set(eName, newSubs);
      } else {
        this.subscriptions.set(eName, [
          {
            id: newId,
            fn,
          },
        ]);
      }
  
      function release() {
        if (this.subscriptions.has(eName)) {
          const subTobeRemoveIndex = this.subscriptions
            .get(eName)
            .findIndex((sb) => sb.id === newId);
          if (subTobeRemoveIndex === -1) {
            throw new Error(
              `can't release, you must have already released event ${eName}`,
            );
          }
  
          let oldSubsFn = this.subscriptions.get(eName);
          let newSubsFn = oldSubsFn.filter((sb) => sb.id !== newId);
          this.subscriptions.set(eName, newSubsFn);
        } else {
          throw new Error(`you are no longer subscribed to event ${eName}`);
        }
      }
  
      const obj = {};
      obj.release = release.bind(this);
      return obj;
    };
  
    this.emit = function (eName, ...args) {
      if (!this.subscriptions.has(eName)) {
        throw new Error(`this eventName ${eName} doesn't exist`);
      }
  
      let subscribedFns = this.subscriptions.get(eName);
  
      for (let i = 0; i < subscribedFns.length; i++) {
        subscribedFns[i].fn.apply(this, args);
      }
    };
  }
  
  let ee = new EventEmitter();
  
  let A = ee.subscribe("A", function (...args) {
    console.log("A");
    console.log(args);
  });
  
  let A1 = ee.subscribe("A", function (...args) {
    console.log("A1");
    console.log(args);
  });
  
  let B = ee.subscribe("B", () => {
    console.log("B");
  });
  
  ee.emit("A", 44, "one");
  ee.emit("A", 1, 2, 3, "one");
  
  A1.release();
  
  ee.emit("A", "lights out and away we go");
  ee.emit("B");
  
  /*
  In this blog we are creating custom event emitter, which is similar to Node.js Event emitter,
  but with basic functionalities [https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter]
  where
  -we can subscribe to particular events
  -can emit an event and trigger the subscribed function with appropriate passed arguments
  -we can unsubscribe/release to particular event, when we no longer needed
  
  
   We are creating a function `EventEmitter`,which has property like `subscriptions` 
  and functions like `subscribe` and `emit`, where `subscriptions` is an Map, which has key as an
  event name, and array as its value, which contains objects having id and the callback function
   are stored in it, here we are using ids, because we want some identifier, so that when we 
  want to release/unsubscribe from event, we can use that id, and remove it from the array of 
  subscribed functions, and whenever we are subscribing, we are incrementing the id, to keep it 
  as unique as possible.
  
      In the subscribe function, we are taking event name and callback function as parameters
      and checking if it already exists in the subscriptions map, if it exists we are updating
      the existing event name subscriptions, and appending the new callback function and updating
      the the map's value, if particular event doesn't exist, we create a new one in map,
      and store it, with new event name, and its value with an array of callback function.
  
  
      In the emit function, we are taking an event name, and passed parameters, and extracting 
      that particular event subscribed functions, and also checking if the event doesn't exist and 
      throwing error for it. if it exists we are iterating over the subscribed functions
      and calling it via `apply` method with passed arguments.
  
      As we also want to unsubscribe/release from particular event name, and we can do that only 
      when we have subscribed to it, we can do that by calling the `release` function,
      upon calling it, all the subscribed functions will removed from the map, and its callback
      functions won't be triggered eventually 
  
  
      In the subscribe function, we are returning a object which has a method `release`
      on it, so that we can release/unsubscribe it, as you can see in the code, we are not just 
      just attaching function `release` to the object, we are also binding that function to the
      current execution context, so that when it is invoked it has access to the subscriptions map
      and it can remove the callback function which are no longer needed, if we don't bind it
      then we won't be able to access the subscriptions object when invoked, and as the `release`
      function is defined within the `subscribe` function, it can access `eName` and the `newId`
      variables as it is forming a closure, and we are able to access it, and when we are calling the 
      release function later so that we can unsubscribe/release using the `eName` and 'newId'
      
  */
  