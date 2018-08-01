const path = require('path')
const { BayesClassifier } = require('natural')

const classifierPath = path.join(__dirname, '../classifier.json')

exports.classifyTweetWithBayes = function (text, callback) {
  BayesClassifier.load(classifierPath, null, (err, classifier) => {
    if (err) {
      console.error(err)
      callback(err, null)
      return
    }

    text = removeHash(text)
    const classifications = []
    const result = classifier.getClassifications(text)
    // Get the 1st two classifications
    classifications.push(result[0].label)
    classifications.push(result[1].label)

    callback(null, classifications)
  })
}

const removeHash = (word) => {
  return word.replace(/#|RT|rt/g, '')
}
