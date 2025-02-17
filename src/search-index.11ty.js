const dateDisplay = require("./_plugins/dates");
var he = require('he');

class SearchIndex {
    data() {
      return {
          // https://www.11ty.io/docs/languages/javascript/#permalinks
        permalink: "/search.json",
        eleventyExcludeFromCollections: true,
      };
    }
  
    render(data) {
        let search = data.collections.post.map(item => {
          return {
            url: item.url,
            title: item.data.title,
            date: dateDisplay(item.data.date),
            summary: item.data.summary,
            content: sanitize(item.templateContent)
          }  
        })
        var stringify = JSON.stringify(search, null, 2)
        return stringify;
      }
  }
  
  module.exports = SearchIndex;


  let sanitize = text => {

      var content = new String(text);
    
      // all lower case, please
      var content = content.toLowerCase();
    
      // remove all html elements and new lines
      var strippedHtml = content.replace(/<[^>]+>/g, ' ');
      var plain = he.decode(strippedHtml);
    
      //remove newlines, and punctuation
      result = plain.replace(/\.|\,|\?|-|—|\n/g, '');
      //remove repeated spaces
      result = result.replace(/[ ]{2,}/g, ' ');
    
      return result;
    
  }