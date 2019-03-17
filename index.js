const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://poedb.tw/area.php';


rp(url) //Query Url
  .then(function(html){
    $('tbody', html).children().each(function() { //Table Body
        if ($(this).children().eq(1).text() == '') { return;} //Some table elements are nothing

        var hold = $(this).children().eq(1).children().eq(0).attr('href'); //Get url for the area from this href

        rp('http://poedb.tw/' + hold) //Make url and query
            .then(function(body){
                console.log('---------------------------------');
                $('.page-content', body).children().eq(9).children().eq(1).children().each(function() { //Foreach of the areas mobs
                    
                    
                    /*
                    Get the data from the table, this was super a quick and messy, later I will come back and make this cleaner
                    */
                    var name = decodeURI($(this).children().eq(1).children().eq(0).attr('href').split('=')[1].replace('+', ' '));
                    var level = $(this).children().eq(0).text();
                    var experience = $(this).children().eq(2).text();
                    var damage = $(this).children().eq(3).text();
                    var attackspersecond = $(this).children().eq(4).text();
                    var life = $(this).children().eq(5).text();

                    //Log data
                    console.log('Level: ' + level + ' Name: ' + name + ' Experience: ' + experience + ' Damage: ' + damage + ' Attacks Per Second: ' + attackspersecond + ' Life: ' + life);
                })
            })
            .catch(function(err) {
                console.log(err); //handle error
            });
    });
  })
  .catch(function(err){
    console.log(err); //handle error
  });