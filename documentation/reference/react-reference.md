# React Reference

This documentation will overview the files and the functions contained within. It will also give instructions on how to code certain functionalities.

## Main Files

Files contained just within `/src`

### App.js, App.css

`App.js` is the main static page for the React App. It holds the navigation which loads certain pages into the main display. It also defines the Effect.

The `useEffect` hook (imported from `'react'`) performs side effects on react components. Our effects script is found in `airavata-api.js`.

The major component of `App.js` is the Router (imported from `'react-router-dom'`). It takes the Navigation component (defined in `components/Navigation.jsx`) and a Switch component to load different pages. 

The router works, generically, like follows

```js
<Router>
    <Navigation />
    <Switch>
        <Route path="/page-name" exact component={() => <PageComponentName />} />
    </Switch>
</Router>
```

Where `page-name` is the name of the page you would like to route to when clicking on the respective navigation component and `PageComponentName` is the name of the JSX file where the page component is defined. The Navigation component must be updated when the routing is updated. The page must also be added to `index.js`.

### index.js, index.css

The index page is where the app is loaded. Here you can see that the app is rendered in strict mode. This allows potential problems to be highlight and does not render any visible UI. It instead activates checks and warnings. See more in the (documentation)[https://reactjs.org/docs/strict-mode.html]

Pages are also exported in this file. 

The following exports a generic page

```js
export { default as PageComponentName } from './components/PageComponentName';
```

Where `PageComponentName` denotes the name of the JSX file.

The CSS file currently contains nothing.

### airavata-api.js

The Airavata API (beautified in `documentation/beautified-airavata-api.js`) controls the effects of the App. 

### reportWebVitals.js

This script allows us to test performance.

```js
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
```

### setupTests.js

```js
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
```

## Pages

React pages are all JSX pages which look similar to HTML but have the full power of javascript (with exceptions related to page updates within React). Props are accessed through the notation `{element}`.

### FileUpload.jsx

This page creates a File Uploads table as the name predicts. 

#### `SearchTable()`

The function `SearchTable` returns a searchable table component. Included are the functions `createData`,`fitsSearch` described below. It also contains the variables `search`, `rows`, and `handleSearch`.

It returns a JSX table formatted with Material Paper Design. The table contains a search cell:

```js
<label htmlFor="search">
    Search Files: &nbsp; &nbsp; 
    <input type="text" id="search" onChange={() => handleSearch} />
</label>
```

and an upload cell:

```js
<label htmlFor="search">
    Upload Files: &nbsp; &nbsp; 
    <input type="file" id="file" multiple/>
</label>
```

And the table rows are automatically filtered by how they match the search via

```js
{rows.filter(fitsSearch).map((row) => (
    <TableRow
    key={row.name}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
    <TableCell>{row.filename}</TableCell>
    <TableCell align="right">{row.user}</TableCell>
    <TableCell align="right">{row.uploadTime}</TableCell>
    <TableCell align="right"><a href="..\graphics\helix.svg">Download</a></TableCell> {/* Will be actual file from cloud */}
    </TableRow>
))}
```

##### `createData(filename, user, uploadTime)`

This function returns a structure containing the parameters to create a row in the table

##### `fitsSearch(val)`

This function returns a boolean denoting whether or not a given value contains the search criteria

##### `search`

This string variable contains the search criteria

##### `rows `

This list variable contains the rows, created by `createData` for the search table.

##### `handleSearch`

This event handler updates the search variable as the search criteria changes.

#### `FileUpload()`

The `FileUpload` function returns the search table in addition to the full page formatting

### JobName.jsx

This page returns a React Fragment containing information for a given job. It contains the following fields: name, description, design count, scaffold count, and the time limit in minutes. 

It uses multiple Material components

#### Typography

Demos:
- [Breadcrumbs](https://mui.com/components/breadcrumbs/)
- [Typography](https://mui.com/components/typography/)

API:

- [Typography API](https://mui.com/api/typography/)

(from API documentation)

#### TextField

The `TextField` is a convenience wrapper for the most common cases (80%).
It cannot be all things to all people, otherwise the API would grow out of control.

###### Advanced Configuration

It's important to understand that the text field is a simple abstraction
on top of the following components:

*   [FormControl](https://mui.com/api/form-control/)
*   [InputLabel](https://mui.com/api/input-label/)
*   [FilledInput](https://mui.com/api/filled-input/)
*   [OutlinedInput](https://mui.com/api/outlined-input/)
*   [Input](https://mui.com/api/input/)
*   [FormHelperText](https://mui.com/api/form-helper-text/)

If you wish to alter the props applied to the `input` element, you can do so as follows:

```jsx
const inputProps = {
  step: 300,
};

return <TextField id="time" type="time" inputProps={inputProps} />;
```

For advanced cases, please look at the source of TextField by clicking on the
"Edit this page" button above. Consider either:

*   using the upper case props for passing values directly to the components
*   using the underlying components directly as shown in the demos

Demos:

- [Autocomplete](https://mui.com/components/autocomplete/)
- [Pickers](https://mui.com/components/pickers/)
- [Text Fields](https://mui.com/components/text-fields/)

API:

- [TextField API](https://mui.com/api/text-field/)
- inherits [FormControl API](https://mui.com/api/form-control/)


(from API documentation)


#### Grid

Demos:

- [Grid](https://mui.com/components/grid/)

API:

- [Grid API](https://mui.com/api/grid/)

(from API documentation)

### New Experiment.jsx


### Past Experiments.jsx


### PDBSettings.jsx


### Review.jsx


### Workspace.jsx, Workspace.css


## Components

### BasicMenu.jsx


### Button.jsx, Button.css


### FileExplorer.jsx

### InputSlider.jsx


### Navigation.jsx


### ProjectMenu.jsx
