# Ensemble
Ensemble is a database driven webapp to assist in managing orchestra personnel and performances.

## Overview
The largest 85 symphony orchestras in the United States performed 1,532 piecees over 8,734 times across 3,091 concerts in the [2016-2017 season](https://www.bsomusic.org/stories/the-data-behind-the-2016-2017-orchestra-season/), yet few database driven solutions for orchestra management exist.

## Scope
Ensemble aims to store a historical record of: over 10,000 musician, over 5,000 pieces, and over 1,000 services, venues, concert cycles and instruments each, so that historical data may be maintained over a several decade timespan.

## UI Configuration
#### Configuring entity and field definitions:
- Entity configuration is stored in `/ensemble-ui/config/entityConfig.json`
- The format for `entityConfig.json` is:
  ```
  "entityName": {
    "description": string,
    "fields": [{
      "name": string,
      "colDef": GridColDef,
    }]
  ```                 

- GridColDef must at minimum contain "field", "headerName", and "editable"
- For additional GridColDef options, see https://v4.mui.com/api/data-grid/grid-col-def/
- For example:
  ```
  "Instruments": {
    "description": "records the instruments that may be played by musicians in the orchestra",
    "fields": [
      { "field": "id", "headerName": "ID", "flex": 0, "editable": false },
      { "field": "name", "headerName": "Name", "minWidth": 180, "editable": true }
    ]
  }
  ```


## Citations
- (October 2021) MUI (Version 5.1.0) [Package] https://mui.com/
- (October 2021) React Bootstrap (Version 2.0.0) [Package] https://react-bootstrap.github.io/
- (October 2021) React (Version 17.0.2) [Framework] https://github.com/facebook/react/
- (October 2021) react-datetime (Version 3.1.1) [Package] https://www.npmjs.com/package/react-datetime
- (October 2021) Robertson, Christian (Version 2.138) [Fonts] https://github.com/google/roboto/
- (October 2021) Bootstrap Icons (Version 1.6.1) [Package] https://icons.getbootstrap.com/
- (November 2021) Lodash (Version 4.17.15) [Package] https://lodash.com/
- (November 2021) MUI/X-Data-Grid (Version 5.0.1) [Package] https://mui.com/components/data-grid/

