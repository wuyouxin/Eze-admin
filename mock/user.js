
const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'http://krpano.deyou360.com/timg.jpg',
    name: 'Super Admin',
  },
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.',
        }
      }

      return {
        code: 200,
        data: token,
        success: true,
      }
    },
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const info = users['admin-token']
      console.log(info)
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.',
        }
      }

      return {
        code: 20000,
        data: info,
        success: true,
      }
    },
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success',
        success: true,
      }
    },
  },
]
