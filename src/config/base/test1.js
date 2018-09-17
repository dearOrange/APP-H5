var invisible = function () {
	console.log("invisible");
  }
  
  module.exports.message = "hi";
  
  module.exports.say = function () {
	console.log(message);
  }
