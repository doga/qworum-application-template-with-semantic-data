/**
 * @file This application's dependencies.
 * @see {@link https://github.com/doga/qworum-for-web-pages}
 * @see {@link https://github.com/doga/language}
 */

export {
  // For using the browsers' Qworum features
  Qworum,

  // For creating Qworum scripts and session data
  QworumScript, 

  // For manipulating semantic RDF data in scripts and session data
  iri, irl, url, urn, IRI, IRL, URN, 
  rdfTermFactory
} from 'https://esm.sh/gh/doga/qworum-for-web-pages@1.8.4/mod.mjs';

export {
  langTag, lang, LanguageTag, Language
} from 'https://esm.sh/gh/doga/language@1.1.0/mod.mjs';
