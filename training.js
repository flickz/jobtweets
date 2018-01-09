const {LogisticRegressionClassifier, BayesClassifier} = require('natural');
const {readFileSync} = require('fs');
const {join} = require('lodash');

const classifier = new BayesClassifier();

function train(){
  var data = readFileSync('training-data.json', 'utf-8');
  data = JSON.parse(data);
  
  for(let i =0; i<data.length; i++){
    //The keywords is an array but natural classifier works better with a string
    //so keywords are turned to string of text.
    let text = join(data[i].keywords, ',')
    classifier.addDocument(text, data[i].field);
  }
}

train();

classifier.events.on('trainedWithDocument', function (obj) {
  //console.log(obj);
});


classifier.train();

var classificat = classifier.getClassifications("RT @rbanks: I\'m looking for two design interns for the summer to work at @MSFTResearchCam. One will focus on UX, working on")

console.log(classificat);

classifier.save('classifier.json', (err, classifier)=>{
  if(err) throw err;

});


// function classifyTweet(text){
//   return new Promise((resolve, reject)=>{
//     BayesClassifier.load('classifier.json', null, (err, classifier)=>{
//       if(err)reject(err);
//       //text = removeHash(text);
//       let classification = classifier.classify(text);
//       if(classification.length > 0){
//         resolve(classification);
//       }
//       resolve(null);
//     });
//   })
// }

// classifyTweet("RT @rbanks: I\'m looking for two design interns for the summer to work at @MSFTResearchCam. One will focus on UX, working on ").then((data)=>{
//   console.log(data);
// }).catch((err)=>{
//   console.log(err);
// })