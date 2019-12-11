import { getRequest, postRequest, putRequest, deleteRequest } from 'common/utils/request'

/**
 * 新增：addXXX
 * 删除：deleteXXX
 * 更新：updateXXX
 * 根据ID查询记录：getXXXDetail
 * 条件查询一条记录：findOneXXX
 * 条件查询：findXXXs
 * 查询所有记录：getAllXXXs
 * 分页查询：getXXXPage
 * 搜索：searchXXX
 * @param {String} url 后端url
 * @param {*****} params 请求后台参数 (GET DELETE)字符串
 * @param {Boolean} isMock 是否需要 Mock 默认不需要
 * @param {Object} config 设置 headers 头
 */

//* ********************************************************************
//* ***************************     用户    ****************************
//* ********************************************************************
export const login = params => postRequest('/user/login', params, true)

export const logout = () => postRequest('/user/logout', true)

export const getUserDetail = params => getRequest('/user/info', params, true)

export const getAllUserMenus = () => getRequest('/menu')

//* ********************************************************************
//* ***************************     菜单     ****************************
//* ********************************************************************
// 拉取所有菜单
export const getAllMenus = () => getRequest('/menu')

// 更新单个菜单
export const updateMenu = params => putRequest('/menu', params)

// 添加菜单|目录
export const addMenu = params => postRequest('/menu', params)

// 删除某个菜单
export const deleteMenu = params => deleteRequest('/menu', params)
