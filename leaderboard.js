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
        return PlayersList.find({}, {
          sort: {
            score: -1,
            name: 1
          }
        });
      },
      'otherHelperFunction': function() {
        return "Some other function";
      },
      'selectedClass': function() {
        var playerId, selectedPlayer;
        playerId = this._id;
        selectedPlayer = Session.get('selectedPlayer');
        if (playerId === selectedPlayer) {
          return "selected";
        }
      },
      'showSelectedPlayer': function() {
        var selectedPlayer;
        selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne(selectedPlayer);
      }
    });
    Template.leaderboard.events({
      'click .player': function() {
        var playerId;
        playerId = this._id;
        return Session.set("selectedPlayer", playerId);
      },
      'click .increment': function() {
        var selectedPlayer;
        selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.update(selectedPlayer, {
          $inc: {
            score: 5
          }
        });
      },
      'click .decrement': function() {
        var selectedPlayer;
        selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.update(selectedPlayer, {
          $inc: {
            score: -5
          }
        });
      },
      'click .remove': function() {
        var selectedPlayer;
        selectedPlayer = Session.get('selectedPlayer');
        PlayersList.remove(selectedPlayer);
        return alert("Aye aye sir, tossed to Davvy Jones' locker!");
      }
    });
    Template.addPlayerForm.events({
      'submit form': function(event) {
        var playerNameVar;
        event.preventDefault();
        playerNameVar = event.target.playerName;
        return PlayersList.insert({
          name: playerNameVar.value,
          score: 0
        });
      }
    });
  }

  if (Meteor.isServer) {
    console.log("Haha. We whipped em agin Josey!");
  }

}).call(this);
