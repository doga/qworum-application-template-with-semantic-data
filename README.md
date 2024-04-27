![Qworum logo and name](https://raw.githubusercontent.com/doga/qworum-website/master/build/assets/images/logos/Qworum-logo-and-name.svg "Qworum logo and name")

# Basic template for Qworum-based web applications

This is a template for a website that uses [Qworum](https://qworum.net)'s advanced web browser capabilities.

This template is:

- _Versioned_. Qworum applications are structured as versioned Qworum APIs, which ensures that other applications that depend on this one will not break after an update.
- _Internationalised_. Qworum API endpoints have language-independent paths which redirect to localised pages.
- _Semantic_, meaning that it uses [RDF](https://www.w3.org/TR/rdf-primer/) for representing data.

In order to make the programmatic handling of RDF easy, this project uses the ORM-like [OSM](https://github.com/doga/object-semantic-mapping) framework on top of RDF.

## The application structure

### Qworum API

This web application is implemented as a Qworum API❖ that has 2 endpoints❖❖:

- The `home` endpoint, which is the main application (meaning that this is an endpoint that is not expected to return a result).
- The `view-product` endpoint, called by `home`.

### Directory structure

- `rdf-store` contains the application's RDF data. In a real-world application this could be replaced by a [SPARQL](https://www.w3.org/TR/sparql11-overview/) API endpoint.
- Directories of the form `v{number}` each contain a different version of the application's API. They contain the first phases of the API endpoints (`home`, `view-product` etc), which are charged with redirecting the user to localised phases.
- Directories with 2-letter names such as `en` contain the localised phases that the end-user actually sees.
- RDF can also be used internally by applications. This is shown by the `settings.ttl` file which defines the API version that will run by default and the localisations that are available.

## Demo

A [demo video](https://www.youtube.com/watch?v=woNsdX8RMfk) is available on Youtube.

## License

This software is released under the terms of the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).

## Notes

❖ Best practice is to use the term "[Qworum class](https://qworum.net/en/specification/v1/#class)" instead of "Qworum API". This is because Qworum uses the [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming) programming paradigm for structuring applications. This README document uses the API terminology, as it should be familiar to first-time Qworum programmers.

❖❖ Best practice is to use the term "method" instead of "endpoint".

∎
