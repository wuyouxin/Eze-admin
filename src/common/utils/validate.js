/**
 * Created by PanJiaChen on 16/11/18.
 */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path)

