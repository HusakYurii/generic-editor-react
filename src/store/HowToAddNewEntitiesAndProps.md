How to add new entity and properties for it

### Data

1. Go StoreData.js file
2. Add new entity type to `ENTITY_TYPES`
3. Create a new interface (use @typedef in JSDOCs comment)
4. Create a new function that will get default object with data. Try to design the object structure as flat as possible.
5. Add a new object to `DefaultStoreData.js` and `MockStoreData.js`
6. Create a new in `store/properties` reducer with its types and actions. Usually there are 3 action types, they are "INIT, REMOVE, UPDATE, IMPORT". See `store/properties/sprite` as example.
7. Add new reducer to the store in `store/index.js` file

### Enabling adding new entity to the tree

1. Go to `TreeOptionsPopup.js` and add new option to `optionsMap`. That will add new option to popup and will allow to add a node for a new entity to the Tree.
2. In the `TreeOptionsPopup.js` import actions to init and remove properties for the new entity. See how it is done for other properties.
3. Add new cases to the `if` structure into the `processClick` function.
4. Go to `Node.js` file and add a new icon for the new entity in `ICONS_TO_ENTITIES_MAP`.

At this point you should be able to see new options in the popup when you hover a node in the tree panel and do right click on the mouse.

That will allow to init nodes and remove them but the rest of the app will not work because you will need to add components to show them and modify.
