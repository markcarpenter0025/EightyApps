// This is sample code for building a web scraper.
//
// For this sample, we use
// http://www.citysearch.com/profile/10192700/lockhart_tx/black_s_barbecue.html
// as a sample listing we want to scrape.
// 
// For the full crawler, we will assume the crawl
// starts from http://www.houzz.com/professionals/

var EightyApp = function() {
  this.processDocument = function(html, url, headers, status, jQuery) {

    // We only want to collect data from listing pages
    if (url.match("/pro/") {

      // First we construct an HTML object so we can use Jquery
      var app = this;
      $ = jQuery;
      var $html = app.parseHtml(html, $);
      var object = {};
	
      // Then we use JQuery to find all the attributes we want
      object.name = $html.find('h1').text();
      object.address = $html.find('span[itemprop="streetAddress"]').text();
      object.city = $html.find('span[itemprop="addressLocality"]').text();
      object.state = $html.find('span[itemprop="addressRegion"]').text();
      object.postalcode = $html.find('span[itemprop="postalCode"]').text();

      // Finally, we return the object as a string
      return JSON.stringify(object);
    }
  }

  this.parseLinks = function(html, url, headers, status, jQuery) {
    var app = this;
    $ = jQuery;
    var $html = app.parseHtml(html, $);
    var links = [];
    if (url.match(/directory/) && !url.match(/directory\//)) {
      $html.find('a.marketLink').each(function() {
	var link = app.makeLink(url, $(this).attr('href'));
	if (link) {
	  links.push(link);
	}
    });
    if (!url.match(/\?/)) {
      var lastPage = $html.find('ul.pagination li').last().text();
      for (var i = 2; i <= lastPage; i++) {
	var link = url + "?page=" + i;
	links.push(link);
      }
    }
  } else if (url.match(/directory\//)) {
    $html.find('li.push a').each(function() {
      var link = app.makeLink(url, $(this).attr('href'));
      links.push(link);
    });
  }
  return links;
}

try {
  module.exports = function(EightyAppBase) {
    EightyApp.prototype = new EightyAppBase();
    return new EightyApp();
  }
} catch(e) {
  console.log("Eighty app exists.");
  EightyApp.prototype = new EightyAppBase();
}
