![Qworum logo and name](https://raw.githubusercontent.com/doga/qworum-website/master/build/assets/images/logos/Qworum-logo-and-name.svg "Qworum logo and name")

# Basic template for Qworum-based web applications

This is a template for a website that uses [Qworum](https://qworum.net)'s advanced web browser capabilities.

This template is:

- _Multi-language_, with language-independent API endpoint paths.
- _Versioned_. Indeed, Qworum applications are structured as Qworum APIs, and versioned APIs ensure that other applications that depend on this one will not break after an update.
- _Semantic_, meaning that it uses [RDF](https://www.w3.org/TR/rdf-primer/) for representing data.

This project has a [companion project](https://github.com/doga/qworum-application-template) that uses plain JSON data instead of RDF.

## The "Hello World" Qworum application

This website implements a Qworum API that has 2 endpoints:

- the `home` endpoint, which is an application (an endpoint that normally never returns a result), and
- the `view-product` endpoint, called by `home`.

Here is the directory structure:

- `rdf-store` contains the application's RDF data. In a real-world application this could be replaced by a [SPARQL](https://www.w3.org/TR/sparql11-overview/) API endpoint.
- Directories of the form `v{number}` each contain a different version of the application's API. They contain the first phases of the API endpoints (`home`, `view-product` etc), which are charged with redirecting the user to localised phases.
- Directories with 2-letter names such as `en` contain the localised phases that the end-user actually sees.
- `settings.ttl` is used internally by the website. It defines the API version that will run by default, and the localisations that are available for all API versions.

## License

This software is released under the terms of the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).

∎
