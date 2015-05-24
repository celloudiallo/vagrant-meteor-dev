/**
  * This directive is necessary to enable preprocessing of JSX tags:
 * @jsx React.DOM
 */

 var cx = React.addons.classSet;

 Players = new Meteor.Collection("players");

 Meteor.methods({
   addPoints: function(userId, points){
     Players.update(userId, { $inc: {score: +points }});
   }
 });

 var Leaderboard = ReactMeteor.createClass({

   templateName: "Leaderboard",

   startMeteorSubscriptions: function(){
     Meteor.subscribe("players");
   },

   getMeteorState: function(){

     var selectedPlayer = Players.findOne(Session.get("selectedPlayer"));

     return {
       players: Players.find({}, { sort: { score: -1, name: 1 } }).fetch(),
       selectedPlayer: selectedPlayer,
       selectedName: selectedPlayer && selectedPlayer.name
     };

   },

   addFivePoints: function(){
     Meteor.call("addPoints", Session.get("selectedPlayer"), 5);
   },

   selectPlayer: function(userId){
     Session.set("selectedPlayer", userId);
   },

   renderPlayer: function(model){
     var selectedPlayerId = this.state.selectedPlayer && this.state.selectedPlayer._id;

     return <Player
       key={model._id}
       name={model.name}
       score={model.score}
       className={model._id === selectedPlayerId ? "selected" : ""}
       onClick={this.selectPlayer.bind(this, model._id)}
       />;
   },

   render: function(){
     var children = [
      <div className="leaderboard">
        {this.state.players.map(this.renderPlayer)}
      </div>
     ];

     if (this.state.selectedName) {
       children.push(
         <div className="details">
           <div className="name">{this.state.selectedName}</div>
           <input
             type="button"
             className="inc"
             value="Give 5 points"
             onClick={this.addFivePoints}
             />
         </div>
       );
     }
     else {
       children.push(
         <div className="message">
           Click a player to select
         </div>
       );
     }

     return <div className="inner">{ children }</div>;
   }

 });

 var Player = React.createClass({
   render: function(){
     var {name, score, ...rest } = this.props;

     return (
       <div {...rest} className={cx("player", rest.className)}>
         <span className="name">{name}</span>
         <span className="score">{score}</span>
       </div>
     );
   }
 });

 // On server startup, create some players if the database is empty.
 if (Meteor.isServer) {
   Meteor.startup(function () {
     if (Players.find().count() === 0) {
       var names = ["Ada Lovelace",
                    "Grace Hopper",
                    "Marie Curie",
                    "Carl Friedrich Gauss",
                    "Nikola Tesla",
                    "Claude Shannon"];
       for (var i = 0; i < names.length; i++) {
         Players.insert({
           name: names[i],
           score: Math.floor(Random.fraction()*10)*5
         });
       }
     }
   });

   Meteor.publish("players", function() {
     return Players.find();
   });
 }
