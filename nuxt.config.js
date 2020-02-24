module.exports = {
  mode: 'universal',
  env: {
    API_TOKEN: process.env.API_TOKEN
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~plugins/vee-validate.js' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  bootstrapVue: {
    components: [
      'BRow',
      'BCol',
      'BContainer',
      'BButton',
      'BFormGroup',
      'BInputGroup',
      'BFormInput',
      'BFormSelect',
      'BCard',
      'BCardText',
      'BFormRadioGroup',
      'BFormRadio',
      'BSpinner',
      'BForm'
    ] // Here you can specify which components you want to load and use
  },

  axios: {
    proxy: true
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['vee-validate'],
    /*
     ** You can extend webpack config here
     */

    analyze: true,

    extend(config, { isDev }) {}
  },
  proxy: {
    '/checkout-api': {
      target: 'https://api.rechargeapps.com/',
      pathRewrite: { '^/checkout-api': '' },
      secure: false,
      changeOrigin: true
    }
  }
}
