### App build with CRA template

A simple app which consumes www.filltext.com.
Tech used:

- styling: css modules with sass
- react hooks - no class components
- axios - for easy http requests

##Features

- using 2 api endpoints(LessDB and Full DB), on selecting - refetch the main app
- sorting ascending or descending by column
- add a new Entry to table ( dumbest validation - if it's not a empty field.. requires min 1 symbol, space - is counted as a symbol) !! not to db, just to a internal app state. ID is generated randomly with Math.random()
- pagination (maximum 50 results per page, 2 previous pages and 2 next pages and current page displays, and also total nr of pages)
  pagination rebuilds when results per page is inputed
- search/filter: in all fields or also you can click on selected fields to search only on that area
- when a result/post is clicked it will display it under the table(bottom of page)
