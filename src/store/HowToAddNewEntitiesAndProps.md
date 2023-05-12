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

### Adding react component for new entity and showing them in properties panel

Each entity has all its properties displayed via react component created in `src/components/properties/*`.
That component will be a collection of other sub-components with inputs. For ex see `SpriteEntity.js` or `GraphicsEntity.js` components.

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

2. If your entity component has more react sub-components, create a folder for then in `src/components/properties/` and put them there. Each of those sub-components can utilize generic inputs from `src/components/properties/genericInputs`.
