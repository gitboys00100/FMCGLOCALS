
export class TranslateService {

//var json = require('./en.json');
    //constructor (private enWords: En) {}
    //constructor () {}


    // ###############################################
    // # PUBLIC
    // ###############################################



    public getTranslate(word) {
      let userstorage = localStorage.getItem("session_data");
      let parser = window.atob(userstorage);
      let usersession = JSON.parse(parser);

      let lang = 'en';
      if(usersession.lang){
        lang = usersession.lang;
      }
      //console.log(usersession.lang);
      var json = require('./localization/'+lang+'.json');
      //console.log(word);
      var find = json.localization[word];
      //console.log(find);
      return find;

/*
      if(usersession.lang == 'en'){
        return find;
      }

      if(usersession.lang == 'my'){
        return "နာမတျောကို";
      }
*/

    }

}
