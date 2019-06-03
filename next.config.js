const withSASS = require('@zeit/next-sass');

module.exports = withSASS({
    cssLoaderOptions: {
        url: false,
        cssModules: true
    },
});

