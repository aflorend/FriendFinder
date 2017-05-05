// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = express.Router();

// Handle data parsing
apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({ extended: true }));
apiRouter.use(bodyParser.text());
apiRouter.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Array to store friend submissions
var friends = [];

// Post routes to handle incoming submission
apiRouter.post('/', function(req, res) {
  var newFriend = req.body;

  scoreDiffs = [];
  scoreDiffTotal = 5000;
  minDiffPosition = 0;

  console.log('friends arr length: ' + friends.length);

  // Compare new submission with other entries in friends array
  if (friends.length > 0) {
    // Iterate through each friend
    for (var i = 0; i < friends.length; i++) {
      // Iterate through each question score and compare
      for (var j = 0; j < newFriend.scores.length; j++) {
        currentScoreDiff = Math.abs(friends[i].scores[j] - newFriend.scores[j]);
        (scoreDiffs).push(currentScoreDiff);
      }
      console.log('score Diff arry: ' + scoreDiffs);

      newScoreDiffTotal = scoreDiffs.reduce(function (total, num) {
          return total + num;
      });

      console.log('new score Diff total: ' + newScoreDiffTotal);

      if (newScoreDiffTotal < scoreDiffTotal) {
        scoreDiffTotal = newScoreDiffTotal
        minDiffPosition = i;
      }

      scoreDiffs = [];
    };

    // Returns best match
    res.json({
      name: friends[minDiffPosition].name,
      photo: friends[minDiffPosition].photo
    });
  // Default match is a cat
  } else {
    res.json({
      name: 'No other friends. Here\'s a Kitty!',
      photo: 'https://s-media-cache-ak0.pinimg.com/736x/91/77/83/917783e9422c077b685170e5a63e8311.jpg'
    });
  }

  // Pushes new submission to full array
  friends.push(newFriend);
});

// Get route to display all possible friends from array
apiRouter.get('/', function(req, res) {
  return res.json(friends);
});

module.exports.apiRouter = apiRouter;
