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
				return PlayersList.find()
			
			,'otherHelperFunction': ->
				return "Some other function"
		})
		
	Template.leaderboard.events({
			'click': ->
				# code here
				alert "haha, funny how?"
		})
	
if Meteor.isServer
	console.log "Haha. We whipped em agin Josey!"