var Keen = require('keen-js');

var my_keen = new Keen({
  projectId: "5624e72e46f9a708ce5d860b",
  writeKey: "0e20c808fbe15f08e1d8e11daa667d100f5c34b4f38e25702e64baafdb7a13b15e578f313649fba5347071ddf1abedb6f4946ccb09c4385b13c8fb9e52a935c605736ad81fa99df8d0035c12d9bf94fac95b1d62cbcbb5c7b95aa551e7b3860d42afe63ef2820dc210af93c69733895a"
});

var keenService = {
  sendEmail: function (email){
    var mail_event = {
      mail: email
    }

    my_keen.addEvent("leads", mail_event, function(err, res){
      if (err) {
        console.log("Imposible to save " + email + " direction because of " + err);
      }
      else {
        console.log("Saved! " + email);
      }
    });
  }
}

module.exports = keenService;