# Change history for ui-oai-pmh

## IN PROGRESS

[UIOAIPMH-65](https://issues.folio.org/browse/UIOAIPMH-65) Avoid private paths in stripes-core imports.
[UIOAIPMH-70](https://issues.folio.org/browse/UIOAIPMH-70) Update Node.js to v18 in GitHub Actions.
[UIOAIPMH-69](https://issues.folio.org/browse/UIOAIPMH-69) *BREAKING* Update `react` to `v18`.
[UIOAIPMH-71](https://issues.folio.org/browse/UIOAIPMH-71) OAI-PMH settings: Ensure your settings HTML page title follow this format - <<App name>> settings - <<selected page name>> - FOLIO
[UIOAIPMH-75](https://issues.folio.org/browse/UIOAIPMH-75) *BREAKING* bump `react-intl` to `v6.4.4`.
[UIOAIPMH-72](https://issues.folio.org/browse/UIOAIPMH-72) prefer @folio/stripes exports to private paths when importing components.

## [4.0.0] (https://github.com/folio-org/ui-oai-pmh/tree/v4.0.0) (2023-02-21)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v3.3.0...v4.0.0)

[UIOAIPMH-22](https://issues.folio.org/browse/UIOAIPMH-22) Expand OAI-PMH Behavior settings with Records Source parameter
[UIOAIPMH-63](https://issues.folio.org/browse/UIOAIPMH-63) Upgrade `react-redux` to `v8`. Upgrade `stripes` to `v8`.
[UIOAIPMH-62](https://issues.folio.org/browse/UIOAIPMH-62) Hide Sets configuration option in Settings->OAI-PMH

## [3.3.0] (https://github.com/folio-org/ui-oai-pmh/tree/v3.3.0) (2022-10-27)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v3.2.2...v3.3.0)

[UIOAIPMH-56](https://issues.folio.org/browse/UIOAIPMH-56) components are incorrectly imported directly from stripes-*packages
[UIOAIPMH-60](https://issues.folio.org/browse/UIOAIPMH-60) core-js is incorrectly listed as a peer-dependency

## [3.2.2] (https://github.com/folio-org/ui-oai-pmh/tree/v3.2.2) (2022-08-03)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v3.2.1...v3.2.2)

[UIOAIPMH-53](https://issues.folio.org/browse/UIOAIPMH-53) Revert Set default settings for OAI-PMH in FOLIO.

## [3.2.1] (https://github.com/folio-org/ui-oai-pmh/tree/v3.2.1) (2022-07-22)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v3.2.0...v3.2.1)

[UIOAIPMH-53](https://issues.folio.org/browse/UIOAIPMH-53) Set default settings for OAI-PMH in FOLIO.
[UIOAIPMH-52](https://issues.folio.org/browse/UIOAIPMH-52) replace babel-eslint with @babel/eslint-parser
[UIOAIPMH-51](https://issues.folio.org/browse/UIOAIPMH-51) Remove react-hot-loader from package.json

## [3.2.0] (https://github.com/folio-org/ui-oai-pmh/tree/v3.2.0) (2022-07-07)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v3.1.0...v3.2.0)

* Update translations

## [3.1.0] (https://github.com/folio-org/ui-oai-pmh/tree/v3.1.0) (2022-03-03)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v3.0.0...v3.1.0)

* prefer @folio/stripes exports to private paths when importing components. Refs UIOAIPMH-41
* Update the UI permission names for current OAI-PMH permissions. Refs UIOAIPMH-39
* Compile Translation Files into AST Format. Refs UIOAIPMH-40.

## [3.0.0] (https://github.com/folio-org/ui-oai-pmh/tree/v3.0.0) (2021-10-07)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v2.1.0...v3.0.0)

* Increment stripes to v7.  Refs UIOAIPMH-43.

## [2.1.0](https://github.com/folio-org/ui-oai-pmh/tree/v2.1.0) (2021-06-10)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v2.0.0...v2.1.0)

* Update translations

## [2.0.0](https://github.com/folio-org/ui-oai-pmh/tree/v2.0.0) (2020-03-06)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v1.3.1...v2.0.0)

* Consume `FormattedDate` and `FormattedTime` via `stripes-components`. Refs UIOAIPMH-29.
* Update `stripes` to `v6.0.0`. Refs UIOAIPMH-35.
* Update `stripes-cli` to `v2.0.0`. UIOAIPMH-38.
* Update translations

## [1.3.1](https://github.com/folio-org/ui-oai-pmh/tree/v1.3.1) (2020-10-15)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v1.3.0...v1.3.1)

* Fix Interfaces dependents for oai-pmh. Refs UIOAIPMH-32.

## [1.3.0](https://github.com/folio-org/ui-oai-pmh/tree/v1.3.0) (2020-10-15)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v1.2.0...v1.3.0)

* Add route for sets, refactoring directory structure, increase code coverage. Refs UIOAIPMH-7.
* Add create/edit set with general information. Refs UIOAIPMH-5.
* Refactor to `miragejs` from `bigtest/mirage`.
* Add ability for delete existing set. Refs UIOAIPMH-11.
* Add ability for duplicate set. Refs UIOAIPMH-8.
* Rename sets endpoints. Refs UIOAIPMH-16.
* Add details view for set. Refs UIOAIPMH-10.
* Add filtering conditions for create/edit set. Refs UIOAIPMH-6.
* Update react-intl to ^5.7.0. Refs UIOAIPMH-20.
* Add set list. Refs UIOAIPMH-9.
* Fix aria-labelledby on create/edit page. Refs UIOAIPMH-27.
* Add validation for uniqueness. Refs UIOAIPMH-18.
* Add form field validation. Refs UIOAIPMH-12.
* Show set details next to the list of sets. Refs UIOAIPMH-25.
* Update stripes to v5. Refs UIOAIPMH-28.
* Add set spec specification on create/edit page. Refs UIOAIPMH-21.

## [1.2.0](https://github.com/folio-org/ui-oai-pmh/tree/v1.2.0) (2020-07-03)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v1.1.0...v1.2.0)

* Add icon for OAI-PMH settings. Refs MODOAIPMH-171.
* Add validation for Max records per response. Refs UIOAIPMH-14.

## [1.1.0](https://github.com/folio-org/ui-oai-pmh/tree/v1.1.0) (2020-06-11)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v1.0.0...v1.1.0)

* Update to stripes v4. Refs MODOAIPMH-132.

## [1.0.0](https://github.com/folio-org/ui-oai-pmh/tree/v1.0.0) (2020-04-29)
[Full Changelog](https://github.com/folio-org/ui-oai-pmh/compare/v1.0.0)

* Create new app with stripes-cli, create OAI-PMH blank UI module. Refs MODOAIPMH-94.
* Implement UI for OAI-PMH settings. Refs MODOAIPMH-97.
* Integrate front-end with back-end to manipulate OAI-PMH settings. Refs MODOAIPMH-110.
* Perform validation for OAI-PMH settings. Refs MODOAIPMH-111.
