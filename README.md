# Ensemble
Ensemble is a database driven webapp to assist in managing orchestra personnel and performances.

## Overview
The largest 85 symphony orchestras in the United States performed 1,532 piecees over 8,734 times across 3,091 concerts in the [2016-2017 season](https://www.bsomusic.org/stories/the-data-behind-the-2016-2017-orchestra-season/), yet few database driven solutions for orchestra management exist.

## Scope
Ensemble aims to store a historical record of: over 10,000 musician, over 5,000 pieces, and over 1,000 services, venues, concert cycles and instruments each, so that historical data may be maintained over a several decade timespan.

## CRUD
- Backend API calls are defined in `api/routes/:entity`
- Frontend API calls are defined in `ensemble_ui/src/utils/callAPI`
- All Frontend CRUD operations are accessed through a React Context Hook defined in `ensemble_ui/src/hooks/useEntity`
- **CREATE** and **UPDATE** are implemented via forms for each entity, defined in `/ensemble_ui/src/components/Forms/`
- **READ** and **DELETE** are implemented via the table in `/ensemble_ui/src/components/DataTable/`

## UI Configuration
#### Configuring entity and field definitions:
- Entity configuration is stored in `/ensemble-ui/src/entityConfig.json`
  - The format for `entityConfig.json` is:
    ```
                                | REQ | DESCRIPTION
    "entityName": {             |  *  | database table name
      "description": string,    |  *  | short description, displayed on homepage
      "fields": [{              |  *  | 
        "field": string,        |  *  | API field identifier (should match SQL column name)
        "columnConfig": {       |  *  | 
          "headerName": string, |  *  | displayed as column header
          "type": string        |     | type definition for table formatting
        } 
      }]
    }
    ```                 

- For example:
  ```
  "Instruments": {
    "description": "records the instruments that may be played by musicians in the orchestra",
    "fields": [
      {
        "field": "id",
        "columnConfig": {
          "headerName": "ID"
        }
      },
      {
        "field": "name",
        "columnConfig": {
          "headerName": "Name"
        }
      }
    ]
  }
  ```


## Citations
- Robertson, Christian (October 2021) Roboto (Version 2.138) [Fonts] https://github.com/google/roboto/
- (October 2021) Bootstrap (Version 5.1.3) [Framework] https://getbootstrap.com/
- (October 2021) Bootstrap Icons (Version 1.6.1) [Package] https://icons.getbootstrap.com/
- (October 2021) React (Version 17.0.2) [Framework] https://github.com/facebook/react/
- (October 2021) React Bootstrap (Version 2.0.0) [Package] https://react-bootstrap.github.io/
- (October 2021) React Router (5.3.0) [Package] https://reactrouter.com/
- (November 2021) Lodash (Version 4.17.21) [Package] https://lodash.com/
- (November 2021) Morgan (Version 1.10.0) [Package] https://github.com/expressjs/morgan
- (November 2021) Express (Version 4.17.1) [Package] https://expressjs.com/
- (November 2021) Chalk (Version 4.1.2) [Package] https://github.com/chalk/chalk
- (November 2021) Mysql (Version 2.18.1) [Package] https://github.com/mysqljs/mysql
- Singh, Parminder (November 2021) ExpressJS/Morgan Issue #53 [Source Code] https://github.com/expressjs/morgan/issues/53#issuecomment-393182002
- Dodds, Kent (November 2021) How to Use React Context Effectively [Article] https://kentcdodds.com/blog/how-to-use-react-context-effectively
