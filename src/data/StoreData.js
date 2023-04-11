export const ROOT_NODE_ID = 1;

export const getNodeProperties = (id, initProps = []) => {
    return {
        [id]: initProps
    }
}

export const getBaseProperties = (id) => {
    return {
        [id]: {
            position: { x: 0, y: 0 },
            scale: { x: 0, y: 0 },
            rotation: 0,
        }
    }
};

export const getSpriteProperties = (id) => {
    return {
        [id]: {
            anchor: { x: 0, y: 0 },
            textureName: ""
        }
    }
};

