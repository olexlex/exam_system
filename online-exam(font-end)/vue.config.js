module.exports = {
    pages:{
        index:{
            entry:'src/main.js'
        },
    },
    lintOnSave: false,
    devServer:{
        proxy:'http://82.156.166.79:23333'
    }
}