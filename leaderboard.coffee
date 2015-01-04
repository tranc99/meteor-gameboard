root = exports ? this
console.log "Hello World. We are now rockin. Oh where is CompoundJS?"
root.PlayersList = new Mongo.Collection 'players'
console.log "Hello World"

#some client-side code
if Meteor.isClient
	# code here
	console.log "All of my pajamas"
	Template.leaderboard.helpers({
			'player': ->
				return PlayersList.find({}, {sort: {score: -1, name: 1} })
			
			,'otherHelperFunction': ->
				return "Some other function"
			
			,'selectedClass': ->
				playerId = this._id
				selectedPlayer = Session.get 'selectedPlayer'
				if playerId == selectedPlayer
					"selected"
			
			,'showSelectedPlayer': ->
				selectedPlayer = Session.get 'selectedPlayer'
				PlayersList.findOne selectedPlayer
		})
		
	Template.leaderboard.events({
			'click .player': ->				
				playerId = this._id
				Session.set "selectedPlayer", playerId
			,'click .increment': ->
				selectedPlayer = Session.get 'selectedPlayer'
				PlayersList.update(selectedPlayer, {$inc: {score: 5}})
			,'click .decrement': ->
				selectedPlayer = Session.get 'selectedPlayer'
				PlayersList.update(selectedPlayer, {$inc: {score: -5}})			
		})
	
if Meteor.isServer
	console.log "Haha. We whipped em agin Josey!"