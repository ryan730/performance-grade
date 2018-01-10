/**
 * Created by ryan.zhu on 2017/12/15.
 　......(\_/)
 　　......( '_')
 　　..../"NOBUG"\======░ ▒▓▓█D
 　　/"""""""""""""""""""\
 　　\_@_@_@_@_@_@_@/
 */
const kue = require('kue');
const queue = kue.createQueue();

var job = queue.create('email', {
  title: 'welcome email for tj'
  , to: 'tj@learnboost.com'
  , template: 'welcome-email'
}).save( function(err){
  if( !err ) console.log( job.id );
});


job.on('complete', function(result){
  console.log('Job completed with data ', result);

}).on('failed attempt', function(errorMessage, doneAttempts){
  console.log('Job failed');

}).on('failed', function(errorMessage){
  console.log('Job failed');

}).on('progress', function(progress, data){
  console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data );

});

queue.process('email', function(job, done){
  email(job.data.to, done);
});

function email(address, done) {
  if(address) {
    //done('invalid to address') is possible but discouraged
    return done(new Error('invalid to address'));
  }
  // email send stuff...
  done();
}

// var redis = require("redis"),
//   client = redis.createClient();
//
// // if you'd like to select database 3, instead of 0 (default), call
// // client.select(3, function() { /* ... */ });
//
// client.on("error", function (err) {
//   console.log("Error " + err);
// });
//
// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// client.hkeys("hash key", function (err, replies) {
//   console.log(replies.length + " replies:");
//   replies.forEach(function (reply, i) {
//     console.log("    " + i + ": " + reply);
//   });
//   client.quit();
// });