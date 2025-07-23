const fs = require('fs-extra')
const path = require('path')
const toml = require('toml')
const merge = require('lodash.merge')

let lang

exports.loadLanguage = function(id){
    lang = merge(lang || {}, toml.parse(fs.readFileSync(path.join(__dirname, '..', 'lang', `${id}.toml`))) || {})
}

exports.query = function(id, placeHolders){
    let query = id.split('.')
    let res = lang
    for(let q of query){
        res = res[q]
    }
    let text = res === lang ? '' : res
    if (placeHolders) {
        Object.entries(placeHolders).forEach(([key, value]) => {
            text = text.replace(`{${key}}`, value)
        })
    }
    return text
}

exports.queryJS = function(id, placeHolders){
    return exports.query(`js.${id}`, placeHolders)
}

exports.queryEJS = function(id, placeHolders){
    return exports.query(`ejs.${id}`, placeHolders)
}

exports.setupLanguage = function(selectedLanguage = 'ko_KR'){
    // Clear any existing language data
    lang = {}
    
    // Load English as base/fallback first
    exports.loadLanguage('en_US')
    
    // Load selected language to override English if it's not English
    if(selectedLanguage !== 'en_US') {
        exports.loadLanguage(selectedLanguage)
    }

    // Load Custom Language File for Launcher Customizer
    exports.loadLanguage('_custom')
}

exports.reloadLanguage = function(language) {
    // Clear current language data
    lang = {}
    
    // Load English as base first
    exports.loadLanguage('en_US')
    
    // Load selected language to override English if it's not English
    if(language !== 'en_US') {
        exports.loadLanguage(language)
    }
    
    // Load Custom Language File for Launcher Customizer
    exports.loadLanguage('_custom')
}

exports.setupLanguageWithConfig = function() {
    try {
        // This function is only called from renderer process
        const ConfigManager = require('./configmanager')
        const selectedLanguage = ConfigManager.getLanguage()
        console.log('ConfigManager.getLanguage() returned:', selectedLanguage)
        exports.setupLanguage(selectedLanguage)
    } catch (error) {
        console.log('Error loading ConfigManager, using fallback:', error)
        // Fallback to default language if ConfigManager is not available
        exports.setupLanguage('ko_KR')
    }
}