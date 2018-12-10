# Questions and Decisions towards App prototype

## Description
Create a React-based single page app to perform searches against the Guardian content API and displays the results.

* The app should take user input from a text field, ​as the user types​ it should take that input and use it to perform a search against the Guardian’s content API - ​https://open-platform.theguardian.com/
* Given the result of that API call it should display a list of results, grouped by the Section of the Guardian the items are found in.
* The results for each item should show the Title, link and publication date (formatted as DD/MM/YYYY).
* Each item should have a button/checkbox that allows it to be bookmarked/pinned. Pinned items should appear below the search results, and stay on screen as search results change.

## Questions

* The search should perform during the process of user input the text, or when the user finishes input text, then press "search" button, then execute the search function?
* When the app perform search by using user input, it is to search throughout the whole API content, including id, type, sectionId..., or just search within the display result, that are Title, link and publication date?
* For the search process, will it case-sensitive and consider redundant blanks?
* When an item is pinned, it immediately appears below the search results, or move to the end of search results when user input the search text?

## Decisions

* When the page is rendered at the start, it displays all the results of the API. Then perform the search live as the user types, if the searched content can be found, list the results as a table, otherwise return "No matched result".
* The search is performed throughout the whole API content, so when the input text matches even news type, sectionId, there are some search results displayed. In this way, the range of search will be broader.
* I decided to implement search as case-insensitive, because in my experience the users usually don't care about the capitals when they type the search content. The approach is to convert the returned API content and the input text to lower case by using toLowerCase(), then to check if they include the input text.
* When user types excessive blanks in the search field, the result will be none as normally there is no continuous blanks appears in the API content, and I assumed that typing redundant blanks may not be a good searching manner.
* When the user search the publication date, only the format of DD/MM/YYYY will be matched since it is the format displayed in the result table.
* Each item has a checkbox in front of them to allow it to be bookmarked/pinned. When the user click the checkbox, the pinned item will stay at that position rather than immediately appears at the end of the search results. Because I think sometimes there are so many items displayed, when the pinned item immediatelly drops down at the bottom, the user will think it suddenly disappears and don't notice that they are at the bottom. They may feel consused about where are the pinned items going. Therefore, the pinned items will appear below the search results once the user typing text in the input field, and stay on screen as search results change. The approach is to insert "isPinned" property into each item of the returned API JSON array, then store  all the items and pinned items as array respectively. Perform search only within those unpinned items, then concat the pinned items behind the searched content as the final filtered content.

## Package Used

| Package        | Install           | Import  |
| -------------  |:-------------:    | -----:  |
| Bootstrap | <ul><li>npm i bootstrap</li><li>npm install bootstrap jquery --save</li><li>npm install popper.js --save</li></ul> | <ul><li>import 'bootstrap/dist/css/bootstrap.css';</li><li>import 'bootstrap/dist/js/bootstrap.js';</li></ul>|
| Axios | npm install axios -- save | import axios from 'axios';|
| moment | npm install moment | import moment from 'moment';|
