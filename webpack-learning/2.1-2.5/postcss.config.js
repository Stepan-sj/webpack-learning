module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [
                // "Android 4.1",
                // "iOS 7.1",
                "Chrome > 5",
                // "ff > 31",
                "ie >= 8",
                "Firefox > 1",
                "Opera>10"
            ],
        })
    ]
    // plugins: {
    //     'autoprefixer': {},
    //   //  'postcss-px2rem': {remUnit: 100}
    // }
}