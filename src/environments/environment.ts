// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  adalConfig: {
    tenant: '8ac76c91-e7f1-41ff-a89c-3553b2da2c17',
    clientId: 'fb2c970a-511a-4c56-9ccf-f9c6554f887f',
    redirectUri: window.location.origin + '/auth',
    postLogoutRedirectUri: window.location.origin + '/auth',
    endpoints: ['https://wolterskluwer.onmicrosoft.com/AdalAngular2']
  },
  avantiq: {
    protocol: 'http',
    host: '192.168.4.107',
    port: '105',
    endpoints: {
      private: {
        activities: '/activities',
        activity: '/activities/:id',
        myActivity: '/current/activities'
      }
    }
  },
  office365: {
    protocol: 'https',
    host: 'outlook.office.com/api/v2.0',
    endpoints: {
      private: {
        me: '/me'
      }
    }
  }
};
