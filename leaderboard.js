(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  console.log("Hello World. We are now rockin. Oh where is CompoundJS?");

  root.PlayersList = new Mongo.Collection('players');

  console.log("Hello World");

  if (Meteor.isClient) {
    console.log("All of my pajamas");
    Template.leaderboard.helpers({
      'player': function() {
        return PlayersList.find();
      },
      'otherHelperFunction': function() {
        return "Some other function";
      }
    });
    Template.leaderboard.events({
      'click': function() {
        return alert("haha, funny how?");
      }
    });
  }

  if (Meteor.isServer) {
    console.log("Haha. We whipped em agin Josey!");
  }

}).call(this);
