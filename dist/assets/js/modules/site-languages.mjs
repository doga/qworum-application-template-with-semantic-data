import { Language, lang } from "../deps.mjs";

/**
 * The set of languages that are available for a given Qworum API version.
 */
class SiteLanguages {
  /** @type {Language[]} */
  languages;

  /**
   * @param {Language[]} languages
   */
  constructor(languages){
    this.languages = languages;
  }

  /**
   * @param {(string | undefined)} pathOfLanguagesFile
   * @returns {SiteLanguages}
   */
  static async read(pathOfLanguagesFile){
    const path = pathOfLanguagesFile ?? 'languages.json';
    let siteLangs = [lang`en`];
    try {
      const response = await fetch(path);
      siteLangs = (await response.json()).map(l => lang`${l}`);
    } catch (error) {}
    return new SiteLanguages(siteLangs);
  }  

  /**
   * Returns the API language that is the most suitable for the end-user.
   * @returns {Language}
   */
  getUserLang(){
    try {
      var userLangCode = null;
      if (window.navigator.language) {
        const browserLang = window.navigator.language.split('-')[0];
        for (let j = 1; j < this.languages.length; j++) {
          const siteLang = this.languages[j].iso639_1;
          if (siteLang === browserLang) {
            userLangCode = siteLang;
            break;
          }
        }
      } else if (window.navigator.languages) {
        for (let i = 0; i < window.navigator.languages.length; i++) {
          const browserLang = window.navigator.languages[i].split('-')[0];
          for (let j = 1; j < this.languages.length; j++) {
            const siteLang = this.languages[j].iso639_1;
            if (siteLang === browserLang) {
              userLangCode = siteLang;
              break;
            }
          }
          if (userLangCode) break;
        }
      } else if (window.navigator.userLanguage) {
        const browserLang = window.navigator.userLanguage.split('-')[0];
        for (let j = 1; j < this.languages.length; j++) {
          const siteLang = this.languages[j].iso639_1;
          if (siteLang === browserLang) {
            userLangCode = siteLang;
            break;
          }
        }
      } else if (window.navigator.browserLanguage) {
        const browserLang = window.navigator.browserLanguage.split('-')[0];
        for (let j = 1; j < this.languages.length; j++) {
          const siteLang = this.languages[j].iso639_1;
          if (siteLang === browserLang) {
            userLangCode = siteLang;
            break;
          }
        }
      } else if (window.navigator.systemLanguage) {
        const browserLang = window.navigator.systemLanguage.split('-')[0];
        for (let j = 1; j < this.languages.length; j++) {
          const siteLang = this.languages[j].iso639_1;
          if (siteLang === browserLang) {
            userLangCode = siteLang;
            break;
          }
        }
      }
      if (!userLangCode) userLangCode = this.languages[0].iso639_1;

      return lang`${userLangCode}`;
    } catch (error) {
      return lang`en`;
    }
  }
}

export default SiteLanguages;
export { SiteLanguages };
