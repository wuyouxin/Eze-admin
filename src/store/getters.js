const getters = {
  SIDEBAR: state => state.app.sidebar,
  DEVICE: state => state.app.device,
  TOKEN: state => state.user.token,
  AVATAR: state => state.user.avatar,
  NAME: state => state.user.name,
  PERMISSION_ROUTES: state => state.user.routes,
}
export default getters
