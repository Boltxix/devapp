var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: "DevOps Application" });
  });
/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about');
  });
/* GET cocktails page. */
router.get('/cocktails', function(req, res, next) {
    var cocktailList = [
      {
        id:1,
        title:'Old Fashioned',
        desc:'The old fashioned is a cocktail made by muddling sugar with bitters and water, adding whiskey (typically rye or bourbon), and garnishing with an orange slice or zest and a cocktail cherry. It is traditionally served with ice in an old fashioned glass (also known as a rocks glass).',
        ingred:"2 tsp sugar syrup or 1 tsp granulated sugar, 1-2 dashes Angostura bitters, splash of water, 60ml Scotch whisky or bourbon, soda water (optional), orange slice, maraschino cherry (optional)",
        img:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/old-fashioned-5a4bab5.jpg?quality=90&webp=true&resize=300,272'
      },
      {
        id:2,
        title:'Margarita',
        desc:'A margarita is a cocktail consisting of tequila, triple sec, and lime juice. Some margarita recipes include simple syrup as well and are often served with salt on the rim of the glass. Margaritas can either be served shaken with ice, without ice, or blended with ice.',
        ingred:"ice, 50ml tequila, reposado 25ml, lime juice 20ml, triple sec For the garnish, salt, 2 lime wedges",
        img:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/tequila_margarita-ffb16fa.jpg?quality=90&webp=true&resize=300,272'
      },
      {
        id:3,
        title:'Espresso Martini',
        desc:'The espresso martini, also known as a vodka espresso, is a cold caffeinated alcoholic drink made with espresso, coffee liqueur, and vodka. It is not a true martini as it contains neither gin nor vermouth, but is one of many drinks that incorporate the term martini into their names.',
        ingred:"100g golden caster sugar For the cocktail, ice, 100ml vodka, 50ml freshly brewed espresso coffee, 50ml coffee liqueur (we used Kahlua), 4 coffee beans (optional)",
        img:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/espresso-martini-f099531.jpg?quality=90&webp=true&resize=300,272'
      },
      {
        id:4,
        title:'Aperol Spritz',
        desc:'A spritz is a Venetian wine-based cocktail, commonly served as an aperitif in Northeast Italy. It consists of prosecco, digestive bitters and soda water. The original Spritz Veneziano uses Select as bitters and was created in Venice in 1920.',
        ingred:"ice,100ml Aperol, 150ml prosecco, soda to top up",
        img:'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/aperol-spritz-0e58f7b.jpg?quality=90&webp=true&resize=300,272'
      },
    ]
    res.render('cocktails', {cocktailList});
  });
  
  
  module.exports = router;