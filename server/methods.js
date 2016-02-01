var red = '0xff8888';
var blue = '0x8888ff';


Meteor.methods({
    dropBase: function() {
        MeteorApp.Card.remove({});
        MeteorApp.Action.remove({});
    },


    gameForTest: function() {
        Meteor.call('dropBase');

        function addCardsToPlayer(ownerId, color, handCards, deckCards) {
            //hand heroes
            for (var i = 0; i < 4; i++) {
                Meteor.call('createCardFromData', cards.heroes[i], ownerId, 'hand', color);
            }
            //hand creatures
            //for (i = 0; i < handCards; i++) {
            //    Meteor.call(
            //        'createCardFromData', _.sample(cards.creatures), ownerId, 'hand', color
            //    );
            //}
            //deck
            //for (i = 0; i < deckCards; i++) {
            for (i = 0; i < 24; i++) {
                Meteor.call(
                    //'createCardFromData', _.sample(cards.creatures), ownerId, 'deck', color
                    'createCardFromData', cards.creatures[i], ownerId, 'deck', color
                );
            }
        }

        addCardsToPlayer('1', red, 8, 42);
        addCardsToPlayer('2', blue, 10, 40);
    },


    gameForDev: function() {
        Meteor.call('dropBase');

        //hands
        for (var i = 0; i < 8; i++) {
            Meteor.call('createRandomCard', {
                ownerId: '1',
                cardGroup: 'hand',
                color: red
            });
        }
        for (i = 0; i < 8; i++) {
            Meteor.call('createRandomCard', {
                ownerId: '2',
                cardGroup: 'hand',
                color: blue
            });
        }
        //decks
        for (i = 0; i < 40; i++) {
            Meteor.call('createRandomCard', {
                ownerId: '1',
                cardGroup: 'deck',
                color: red
            });
        }
        for (i = 0; i < 40; i++) {
            Meteor.call('createRandomCard', {
                ownerId: '2',
                cardGroup: 'deck',
                color: blue
            });
        }
        //mana
        for (i = 0; i < 1; i++) {
            Meteor.call('createRandomCard', {
                ownerId: '1',
                cardGroup: 'manaPool',
                color: blue
            });
        }
        for (i = 0; i < 1; i++) {
            Meteor.call('createRandomCard', {
                ownerId: '2',
                cardGroup: 'manaPool',
                color: red
            });
        }
    },


    createRandomCard: function(params) {
        var hp = _.sample([1, 3, 4]);

        var data = _.defaults(params, {
            title: _.sample(['Жирный орк', 'Тонкий орк', 'Средний орк']),
            type: 'creature',
            text: 'Любит есть и танцы. А еще футбол.\nА еще он любит заниматся спортом.',
            x: _.sample([1, 2, 3]),
            y: _.sample([1, 2, 3]),
            dmg: _.sample([1, 2, 3]),
            mana: _.sample([1, 2, 3]),
            counter: 5,
            health: hp,
            maxHealth: hp,
            imageName: _.sample(MeteorApp.imageFileNames),
            cardGroup: _.sample(['hand', 'deck', 'table']),
            ownerId: _.sample(['1', '2']),
            isTapped: false,
            color: _.sample([red, blue])
        });

        MeteorApp.Card.insert(data);
    },


    createCardFromData: function(cardData, ownerId, cardGroup, color) {
        cardData.ownerId = ownerId;
        cardData.cardGroup = cardGroup;
        cardData.color = color;

        cardData.maxHealth = cardData.health;

        MeteorApp.Card.insert(cardData);
    }
});
