How to add new entity and properties for it

### Data

1. Go `StoreData.js` file
2. Add new entity type to `ENTITY_TYPES`. It will be used across the project.

```javascript
export const ENTITY_TYPES = Object.freeze({
  //...
  [NEW_ENTITY_NAME]: NEW_ENTITY_NAME,
});
```

3. Create a new interface (use @typedef in JSDOCs comment). Then create a new function that will get default object with data. Try to design the object structure as flat as possible.

```javascript
// for example
/**
 * @typedef {{ }} I[ENTITY_NAME]Properties
 */

/**
 * @returns I[ENTITY_NAME]Properties
 */
export const get[ENTITY_NAME]Properties = () => {
  return {
    //default properties to initialize the data
  };
};
```

4. Create a new reducer in `store/properties` with its types and actions. That reducer will keep properties for new entity type. Usually there are 4 action types, they are "INIT, REMOVE, UPDATE, IMPORT". See `store/properties/sprite` as example.

You will have four files there, for example lets create a new subfolder and call it the way that matches the entity.

```
store /
|
+------ properties /
        |
        +----- animatedSprite /
                |
                +-- actions.js
                +-- actionTypes.js
                +-- reducer.js
                +-- index.js

```

5. The reducer should cover all 4 actions. It must also call a function we created in step **3** when a new property is being initialized.

```javascript
export const [ENTITY_NAME]PropertiesListReducer = (state = STATE, { type, payload }) => {
    if (type === ACTIONS.INIT_[ENTITY_NAME]_PROPERTIES) {
        const newState = { ...state, [payload.nodeID]: get[ENTITY_NAME]Properties() };
        return newState;
    }
    else if (type === ACTIONS.REMOVE_[ENTITY_NAME]_PROPERTIES) {
        const newState = { ...state };
        delete newState[payload.nodeID];
        return newState;
    }
    else if (type === ACTIONS.UPDATE_[ENTITY_NAME]_PROPERTIES) {
        const newState = { ...state };
        newState[payload.nodeID] = payload.properties ;
        return newState;
    }
    else if (type === ACTIONS.IMPORT_[ENTITY_NAME]_PROPERTIES) {
        return { ...payload }
    }
    else {
        return state;
    }
};

```

6. Add new reducer to the store in `store/index.js` file

```javascript
const store = createStore(combineReducers({
    //...
    [ENTITY_NAME]PropertiesList: [ENTITY_NAME]PropertiesListReducer
}));
```

7. Add a new empty object object to `DefaultStoreData.js` and `MockStoreData.js` to store the collection of properties for new entity. Optionally you can add mock data for the options to test it. Be aware that base properties must be added for new entity, because they inherently exist for any type of entity. Use the same id to connect the data.

```javascript
// In the DefaultStoreData.js and MockStoreData.js
export const defaultStoreData = {
  tree: {
    //...
  },
  entitiesList: {
    //...
  },
  properties: {
    [NEW_ENTITY]: {}, // for default data it should be an empty object
  },
};
```

### Enabling adding new entity node to the tree

1. Go to `TreeOptionsPopup.js` and add new option to `optionsMap`. That will add new option to popup and will allow adding a node for a new entity to the Tree.

```javascript
// new ENTITY TYPE will be become available because it gets remapped at the top of the file, like so
const OPTIONS_MAP = {
  ...ENTITY_TYPES,
  REMOVE_OPTION: "REMOVE_OPTION",
};

// it will be converted into options in the popup
const optionsMap = [
  {
    option: OPTIONS_MAP[ENTITY_NAME],
    label: "Add ENTITY_NAME",
    isAvailable: () => true, // you can configure whether an option is available
  },
];
```

2. In the `TreeOptionsPopup.js` import actions to INIT and REMOVE properties for the new entity. Connect those actions to the props of the component at the end of the file. See how it is done for other properties.
3. Add new cases to the `if` structure into the `processClick` function. There 2 cases are must be handled INIT and REMOVE.
4. Add new icon to `src/assets/icons`, Then, go to `Node.js` file and add a new icon for the new entity in `ICONS_TO_ENTITIES_MAP`.

At this point you should be able to see a new option in the popup when you hover a node in the tree panel and do right click on the mouse. That will allow to init nodes and remove them but the rest of the app will not work because you will need to add components to show them and modify.

### Adding react components for new entity and showing them in properties panel

Each entity has all its properties displayed via react component created in `src/components/properties/*`.
That component will be a collection of other sub-components with inputs. For ex see `SpriteEntity.js` or `GraphicsEntity.js` components. It is important to know that each entity component must include `name` and `base` properties.

1. Add a new `[Name]Entity.js` component to `src/components/properties/*`. That component must export a function, a checker, which will be used to check the type of the component. Each entity component must have name property and base properties. Name is used for the node in the tree that represents the entity and the base property has values each entity inherently has.

```javascript
import React from "react";
import { NameProperty } from "./name";
import { BaseProperties } from "./base";
import { ENTITY_TYPES } from "../../data/StoreData";

/**
 * @param {number} id
 * @param {import("../../store").IStore} store
 */
export const is[NAME]Entity = (id, store) => {
    const entity = store.entityTypesList[id];
    return entity && entity.type === ENTITY_TYPES.TEXT;
};

export const [NAME]Entity = () => {
    return (
        <div>
            <NameProperty />
            <BaseProperties />
        </div>
    )
};

```

2. Add your new entity component to the `ENTITY_TYPES_TO_COMPONENTS_MAP` in the `PropertiesPanel.js` file, like so.

```javascript
import { [NAME]Entity, is[NAME]Entity } from "./[NAME]Entity";

const ENTITY_TYPES_TO_COMPONENTS_MAP = [
   // ... other components
    { checker: is[NAME]Entity, component: <[NAME]Entity /> },
];
```

Each entity has a checker which will help to define what entity component should be shown for selected node in the tree.

3. If your entity component has more react sub-components, create a folder for then in `src/components/properties/` and put them there. Each of those sub-components can utilize generic inputs from `src/components/properties/genericInputs`.

### Adding react components for new entity to render it in preview panel (canvas)

At this point you should have data in the store, all actions in place to init or remove an entity with its props from the store via Tree Options Popup. Also you should have a Entity Component that displays the properties and allows to modify the data. Now it is time to add a custom view component to render the how the entity should look.

It is important to know that PIXI.js v4.6.0 is used to render react components. But that should be more then enough to render things 80% of the games use.

1. Go to `src/components/preview/PreviewPanel` and connect the component to a new reducer, you can see it at the end of the file. That is needed to pass the props down the tree builder.
2. Create a custom PIXI component using `react-pixi-fiber`. Add the component to the `preview/custom/` sub-folder. You can use `CContainer.js` as an example.
3. Import the component to the `createPixiTree.js` file and create a new case for the new entity type. The function receives the dependencies where a new data from reducer can be found.

### Enabling pre / post processors to import / export data

The logic that is used to export or import data is in the Header component. It starts there when a certain command is chosen.

1. Go to `src/components/header/features/exportLogic` and add the properties to the result JSON file in `exportMainData` function.
2. To import the data, you need to import the action from the reducer and connect it to the props of the header component.
3. Go to `src/components/header/features/importLogic`. There in `importMainFile` call the import function you connected via props to import the data to the store.
