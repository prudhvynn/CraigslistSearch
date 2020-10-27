const express = require('express');
const router = express.Router();
const craigslist = require('node-craigslist');

// Get all postings
router.get('/posts', (req, res) => {
  var posts = [];

  let client = new craigslist.Client({
    city : "toronto"
  });
  client
  .search(req.query.keyword)
  .then((listings) => {
    posts = posts.concat(listings);
    posts.sort(function(b, a) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  posts = removeDuplicatesFromObjArray(posts, "pid");

   for(var i = 0; i < posts.length; i++) {

   var urls = posts[i].url;
   var pre = urls.split("//")[1];
   var post = pre.split(".")[0];
   posts[i].city = post.toUpperCase();

  }
    res.status(200).json(posts);
  })
  .catch((err) => {
  res.status(500).send(err);
  });

});

removeDuplicatesFromObjArray = function(arr, prop) {
    var new_arr = [];
    var lookup  = {};

     for (var i in arr) {
         lookup[arr[i][prop]] = arr[i];
     }
     for (i in lookup) {
         new_arr.push(lookup[i]);
     }
     return new_arr;
}
module.exports = router;