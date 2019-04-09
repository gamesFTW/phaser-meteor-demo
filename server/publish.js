Meteor.publish('Cards', function() { return MeteorApp.Cards.find() });
Meteor.publish('CardsNames', function() { return MeteorApp.Cards.find({}, {fields: {title: 1, _id: 1}}); });
Meteor.publish('Decks', function() { return MeteorApp.Decks.find() });
Meteor.publish('Games', function() { return MeteorApp.Games.find() });
Meteor.publish('Images', function() { return MeteorApp.Images.find() });

MeteorApp.Images.allow({
  'insert': function () {
    return true;
  }
});
