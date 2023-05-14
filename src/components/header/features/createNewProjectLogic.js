import { cleanUpUsedUIDsMap } from "../../../tools/uidGenerator";
import { exportData } from "./exportLogic";
import { cloneDeep } from "lodash"
import { importMainDataInStrictOrder } from "./importLogic";
import { defaultStoreData } from "../../../data/DefaultStoreData";

/**
 * @param {import("../Header").HeaderComponentDependencies} actions 
 */
export const createNewProject = (actions) => {

    cleanUpUsedUIDsMap();

    const data = cloneDeep(defaultStoreData);

    importMainDataInStrictOrder({
        treeData: data.tree.treeData,
        entityTypesList: data.entitiesList,
        basePropertiesList: data.properties.base,
        spritePropertiesList: data.properties.sprite,
        nineSliceSpritePropertiesList: data.properties.nineSliceSprite,
        graphicsList: data.properties.graphics,
        textPropertiesList: data.properties.text,
    }, actions);
    actions.importResourcesAction({});
};

/**
 * @param {import("../../../store").IStore} store 
 * @param {import("../Header").HeaderComponentDependencies} actions 
 */
export const exportDataAndCreateNew = (store, actions) => {
    exportData(store, () => createNewProject(actions));
};
