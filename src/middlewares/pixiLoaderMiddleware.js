import { Texture, utils, BaseTexture } from "pixi.js";
import { convertImageFilesToBase64 } from "../tools/resourcesTools";

/**
 * Because I use the pixi as the renderer in this editor I need to preload the resources to the pixi texture cache
 * That is why I use this middle ware to make it easier to remove the pixi from the project if I need
 * @param {Loader} pixiLoader 
 * @param {{[key: string]: Texture}} textureCache 
 * @returns {{
 * loadAssets: (assets: File[] | File, onFinish?: () => void) => void;
 * removeAssets: (assets: File[] | File) => void;
 * }}
 */
const pixiLoaderMiddleware = (textureCache, baseTextureCache) => {

    return {
        loadAssets(assets, onFinish = () => { }) {
            if (!Array.isArray(assets)) {
                assets = [assets]
            }

            convertImageFilesToBase64(assets, (convertedAssets) => {
                convertedAssets.forEach(({ name, url }) => {
                    const image = new Image();
                    image.src = url;

                    const baseTexture = new BaseTexture(image);
                    const texture = new Texture(baseTexture);

                    BaseTexture.addToCache(texture, name);
                    Texture.addToCache(texture, name);
                });
                onFinish();
            });
        },

        removeAssets(assets) {
            if (!Array.isArray(assets)) {
                assets = [assets]
            }

            assets.forEach((file) => {
                textureCache[file.name].destroy(true);
                baseTextureCache[file.name].destroy(true);
                delete textureCache[file.name];
                delete baseTextureCache[file.name];
            });
        }
    }
}

/**
 * Middleware
 */
export const pixiLoader = pixiLoaderMiddleware(utils.TextureCache, utils.BaseTextureCache);