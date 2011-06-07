var deck = (function() {
	var api = {},
		prosperityBasics = false,
		cards = [],
		currentDeckName = null,
		deckSize = 10,
		cardSelection = [],
		savedDecks = config.get('saved_decks')

	// Pubilc Variables/Constants
	api.LAST_DECK = '_lastDeck';

	function resetLibrary() {
		var replacementCards = JSONQuery("[?replacement]", LIBRARY);
		for(i in replacementCards) {
			replacementCards[i].replacement = false;
		}
	}

	function chooseProsperityBasics() {
		var randomCard = getRandomCard(cards, false);
		return ('Prosperity' == randomCard.set);
	}

	/**
	 * Generates a string abbreviation of a card's set.
	 *
	 * In general, the single-letter set abbreviation is simply that set's first
	 * letter. (Hopefully future expansions do not make this obnoxious).
	 *
	 * The notable exception, is Promo cards. To avoid being confused with the
	 * Prosperity expansion, promo cards have been given the abbreviation of
	 * and asterisk ('*').
	 *
	 * This also represents their not-entirely-part-of-a-set nature.
	 *
	 * @param object A card object.
	 * @return string
	 */
	function getCardSetAbbrevition(card) {
		var cardSet = $(document.createElement('span'))
			.addClass('cardSet').addClass(card.set);

		var setAbbr = 'Promo'==card.set ? '*' : card.set.substring(0,1);

		$(cardSet).text('['+setAbbr+']');

		return cardSet;
	}

	/**
	 * Generates an string abbreviation of a card's type.
	 *
	 * This string is divided into three sections:
	 * Attack/Defense
	 * Action/Treasure/Victory
	 * Duration
	 *
	 * In general, the single-letter abbreviation for a given type is that type's 
	 * first letter. The exception to this is Defense cards, the abbreviation is 
	 * "R", for "Reaction". This is for two reasons: to avoid confusion with 
	 * Duration cards, and because the in-game name for these cards is officially
	 * 'Reaction' cards.
	 *
	 * @param object A card object
	 * @return string
	 */
	function getCardTypeAbbreviation(card) {
		var cardType = $(document.createElement('span')).addClass('cardType')
			.append('[');

		// Action/Treasure/Victory cards
		// We're going to assume that any card MUST at least one of an Action card,
		// Treasure card, or Victory card.
		if( card.type.action ) {
			$(document.createElement('span')).addClass('type_Action')
				.text('A').appendTo(cardType);
		}
		if( card.type.treasure ) {
			$(document.createElement('span')).addClass('type_Treasure')
				.text('T').appendTo(cardType);
		}
		if( card.type.victory ) {
			$(document.createElement('span')).addClass('type_Victory')
				.text('V').appendTo(cardType);
		}

		// Attack/Reaction (Defense) cards.
		if( card.type.attack || card.type.defense ) $(cardType).append('-');
		if( card.type.attack ) {
			$(document.createElement('span')).addClass('type_Attack')
				.text('A').appendTo(cardType);
		}
		if( card.type.defense ) {
			$(document.createElement('span')).addClass('type_Defense')
				.text('R').appendTo(cardType);
		}

		// Duration cards
		if( card.type.duration ) {
			$(cardType).append('-');
			$(document.createElement('span')).addClass('type_Duration')
				.text('D').appendTo(cardType);
		}
		$(cardType).append(']');

		return cardType;
	}

	/**
	 * Retrieves a random card from the array passed in.
	 *
	 * Selects a random card from the array passed in, and returns it.
	 * Additionally, this will iterate until a card is found that is not already
	 * in the cards array.
	 *
	 * @param array cardArray An array of cards to select from.
	 * @return object The card selected from cardArray
	 */
	function getRandomCard(cardArray, forceNotInDeck) { if( undefined===forceNotInDeck ) forceNotInDeck = true;
		var card;
		do {
			card = cardArray[Math.floor(Math.random()*cardArray.length)];
		}
		while(forceNotInDeck && 0 < JSONQuery("[?name=$1]",cards,card.name).length);

		return card;
	}

	function buildSetListItemHTML(deckName,deck) {
		var li = $(document.createElement('li'));

		$(document.createElement('a')).addClass('setName')
			.attr('href','javascript:;').text(deckName).appendTo(li);

		return li;
	}

	/**
	 * Generate the DOM Elements for a single card entry.
	 *
	 * Utilizes jquery to build up a List Item (li) for a single card object.
	 * Includes information about the card based on config settings.
	 *
	 * @param object card The Card object to use.
	 * @return object JQuery DOM object
	 */
	function buildCardListItemHTML(card) {
		var li = $(document.createElement('li'));

		if( card.replacement ) $(li).addClass('replacementCard');

		if( config.get('display_Set') ) {
			$(li).append(getCardSetAbbrevition(card));
		}

		$(document.createElement('span')).addClass('cardName')
			.text(card.name).appendTo(li);

		if( config.get('display_Cost') ) {
			$(document.createElement('span')).addClass('cardCost')
				.text('['+card.cost+(card.potion?'P':' ')+']').appendTo(li);
		}

		if( config.get('display_Type') ) {
			$(li).append(getCardTypeAbbreviation(card));
		}

		$(li).qtip({
			content: 'Replace',
			position: {
				target: 'mouse',
				corner: {
					target: 'topMiddle',
					tooltip: 'bottomMiddle'
				},
				adjust: {
					mouse: false,
					screen: true
				}
			},
			show: {
				solo: true,
				when: {
					event: 'click',
				}
			},
			hide: {
				fixed: true,
				when: {
					event: 'unfocus'
				}
			},
			style: {
				'color': 'white',
				'padding': '3px 8px',
				'background': '-webkit-gradient(linear, left top, left bottom, from(#ccc), to(#000))',
				'font-weight': 'bold',
				tip: {
					corner: 'bottomMiddle'
				},
				border: {
					width: 0,
					radius: 3,
					color: 'black'
				}
			},
			api: {
				beforeShow: function() {
					var d = new Date();
					if( (d.getTime() - ACTIVE_TIP) < 200 ) {
						return false;
					}
				},
				onShow: function() {
					var li = this.elements.target;
					$(li).addClass('hilight');
					$(this.elements.tooltip).click(function() { replaceSingleCard(li); });
				},
				onHide: function() {
					var d = new Date();
					ACTIVE_TIP = d.getTime();
					$(this.elements.target).removeClass('hilight');
				}
			}
		});

		return li;
	}

	api.replaceCard = function(cardLi) {
		var cardName = $(cardLi).find('.cardName').text();
		var card = JSONQuery("[?name=$1]", cards, cardName)[0];
		var prunedCards = JSONQuery("[?name!=$1]", cards, cardName);
		var newCard;

		if( card.type.defense && config.get('deck_RequireDefense') && 
				JSONQuery("[?type.attack]", cards).length > 0 ) {
			// This is a defense card AND we have an attack card AND 
			// deck_RequireDefense is set to true, So force the replaced card to 
			// be a defense card.
			newCard = getRandomCard(
				JSONQuery("[?type.defense&name!=$1]", cardSelection, cardName));
			newCard.replacement = true;
			prunedCards.push(newCard);
		}
		else if( card.potion &&
				JSONQuery("[?potion]",prunedCards).length<config.get('set_Alchemy_MinCards') ) {
			// This is a Potion card, and we're now below the minimum number of 
			// Potion Cards. So force choosing another potion card.
			newCard = getRandomCard(
				JSONQuery("[?potion&name!=$1]", cardSelection, cardName));
			newCard.replacement = true;
			prunedCards.push(newCard);
		}
		else {
			// Just choose any other card.
			// NOTE: This really needs to respect the requireDefense and
			// Alchemy_MaxCards
			newCard = getRandomCard(JSONQuery("[?name!=$1]", cardSelection, cardName));
			newCard.replacement = true;
			prunedCards.push(newCard);
		}
		cards = prunedCards;
	}

	/**
	 * Randomly generate a new deck of Dominion Cards.
	 *
	 * Clear's the existing deck of cards, and randomly generates a new one.
	 * The deck is built based on the configuration settings:
	 * 'sets': An array of which Dominion Card Sets to draw from
	 * 'sets_Promo': An array of which Promo cards to include in the above sets.
	 * 'set_Alchemy_MinCards': If the 'Alchemy' set is used, the minimum
	 *    number of cards to use from this set.
	 * 'set_Alchemy_MaxCards': If the 'Alchemy' set is used, the maximum
	 *    number of cards to use from this set.
	 *
	 * @return object JQuery Object for the deck as an Unordered List
	 */
	api.generateDeck = function() {
		resetLibrary();
		cards = [];
		var usingAlchemy = (config.get('sets').indexOf('Alchemy') > -1);


		// First, build the cardSelection array based on our options.
		//var setString = 'set="'+config.get('sets').join('"|set="')+'"';
		var promoString = '';
		if( config.get('sets_Promo').length > 0 ) {
			promoString = '|name="'+config.get('sets_Promo').join('"|name="')+'"';
		}
		cardSelection = JSONQuery('[?set="'+(config.get('sets').join('"|set="'))+
			'"'+promoString+']',LIBRARY);

		// Generate the remainder of the cards
		while(cards.length < deckSize) {
			var card;
			if( usingAlchemy &&
				JSONQuery("[?potion=true]",cards).length < config.get('set_Alchemy_MinCards') ) {
				// If we're using alchemy, and do not yet have the minimum number of
				// potion cards, simply select a random potion card.
				card  = getRandomCard(JSONQuery("[?potion=true]", cardSelection));
			}
			else if( usingAlchemy &&
				JSONQuery("[?potion=true]",cards).length >= config.get('set_Alchemy_MaxCards') ) {
				// If we're using Alchemy cards, and we're already at the maximum number
				// of potion cards, select a NON-Potion card.
				card = getRandomCard(JSONQuery("[?potion=false]", cardSelection));
			}
			else {
				// Otherwise, select a random card.
				card = getRandomCard(cardSelection);
			}

			// We should now have a valid card, so push it to our cards array
			cards.push(card);

			// If this is an attack card,
			// check to see if we're requiring a defense card
			if( card.type.attack && config.get('deck_RequireDefense') ) {
				if( 0 == JSONQuery("[?type.defense=true]", cards).length ) {
					// We don't already have a defense card,
					// So randomly select one and push it into our card array.
					cards.push(getRandomCard(
						JSONQuery("[?type.defense=true]",cardSelection)));
				}

				if( cards.length > deckSize ) {
					// If we went over the deck size, remove an earlier card.
					// NOTE: we check to see if we're using the Alchemy set. If so those
					// are going to be the "first" elements in the array. We want to
					// preserve those cards (to meet the 'set_Alchemy_MinCards' setting
					// requirement. As such, we start the splice in by that many cards.
					cards.splice((usingAlchemy?config.get('set_Alchemy_MinCards'):0), 1);
				}
			}

		}

		// Perform the random check to see if we should include the Colony/Platinum 
		// basic cards from prosperity.
		// NOTE: We do this check regardless of whether prosperity was actually
		// used. The check itself is cheap, and works fine regardless.
		prosperityBasics = chooseProsperityBasics();

		api.save(api.LAST_DECK);
		return api.buildDeckHTML();
	}

	/**
	 * Save a deck to localstorage
	 *
	 * The current deck is saved to localstorage, using the name passed in as a
	 * key. A wrapper object is built to contain not merely the set of cards in
	 * the deck, but the "prosperityBasics" property as well. Hopefully this will
	 * be future-proof enough to work for later additions.
	 *
	 * @param string deckName Name to use for this saved deck.
	 */
	api.save = function(deckName) {
		if( 'string' != typeof deckName ) return;

		var deck = {};
		deck.cards = cards;
		deck.prosperityBasics = prosperityBasics;

		savedDecks[deckName] = deck;
		config.set('saved_decks', savedDecks);
	}

	api.clearSavedDeck = function(deckName) {
		delete savedDecks[deckName];
		config.set('saved_decks', savedDecks);
	}

	/**
	 * Load a deck saved deck from localstorage
	 *
	 * This takes a string deck name, and loads that config value from storage.
	 * Some basic validity checking is done to ensure the data is not
	 * significantly mangled, but it is not (yet) terribly robust.
	 *
	 * @param string deckName the name of the deck to load.
	 * @return boolean Success of the load operation.
	 */
	api.load = function(deckName) {
		// Make sure our deck name is actually a string.
		if( 'string' != typeof deckName ) return;

		// Check to see if the deck is in the savedDecks array.
		if( !(deckName in savedDecks) ) return; 
		var deck = savedDecks[deckName];

		// Make sure we HAVE a set of cards
		// Make sure that set of cards is actually an array
		// Make sure we have [deckSize] cards.
		if( !('cards' in deck) || !(deck.cards instanceof Array) ||
				deck.cards.length < deckSize ) {
			api.clear(deckName);
			return false;
		}

		cards = deck.cards;
		prosperityBasics = ('prosperityBasics' in deck) 
			? deck.prosperityBasics : false;

		return true;
	}

	api.buildSetListHTML = function() {
		var ul = $(document.createElement('ul'));

		// Sort our saved deck keys.
		var keys = [];
		for(k in savedDecks) {
			//if( k != api.LAST_DECK )
				keys.push(k);
		}
		keys.sort( function(a,b){ return (a>b) - (a<b); } );
		for(var i=0; i<keys.length; i++) {
			$(ul).append(buildSetListItemHTML(keys[i], savedDecks[keys[i]]));
		}

		return ul;
	}
	/**
	 * Build an HTML structure for the entire deck (as an Unordered List)
	 *
	 * This simply creates an unordered list element, and iterates over the list,
	 * appending the individual card list items to it.
	 *
	 * Individual card items are built using buildCardListItemHTML.
	 *
	 * NOTE: This is a public method and does NOT regenerate the deck,
	 * so we can rebuild the deck html at any time if we need.
	 *
	 * @return object JQuery html object.
	 */
	api.buildDeckHTML = function() {
		// Sort the selected cards based on the config settings.
		// We sort in this method, to account for potentially replaced cards.
		// We always want to default to sorting by name, if other factors are equal.
		var sortBy = config.get('sort');
		// NOTE: "Hidden" setting, a sort setting of "order" is basically non-sorted
		// Cards are in the order they were added to the array. For debug use.
		if( 'order' != sortBy ) {
			var sortString = '/name';
			if( 'set' == sortBy) sortString = '/set,'+sortString;
			else if( 'cost' == sortBy ) sortString = '/cost,/potion,'+sortString;

			cards = JSONQuery('['+sortString+']',cards);
		}

		var ul = $(document.createElement('ul'));
		if( config.get('deck_ChooseProsperityBasics') ) {
			var li = $(document.createElement('li'));
			$(document.createElement('span')).addClass('cardName')
				.text('Include Colony/Platinum?').appendTo(li);
			$(document.createElement('span')).addClass('cardCost')
				.text('['+(prosperityBasics?'YES':'NO')+']').appendTo(li);
			$(ul).append(li);
		}

		for(i in cards) {
			$(ul).append(buildCardListItemHTML(cards[i]));
		}
		return ul;
	}

	api.saveCurrent = function(name) {
		name = $.trim(name);
		if( undefined == name || null == name || '' == name ) return false;



		return true;
	}

	return api;
})();

