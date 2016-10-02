'use strict';

var SeafileAPI = require('seafile-api');
var moment = require('moment');
var config = require('./config.js');

var sf = new SeafileAPI(config.url, config.token);

// check whether there are file present
sf.listDirEntries({
    repo_id: config.repos.sync,
    p: config.srcDir,
    t: 'f',
}, (err, body) => {
    if(!body.length) return; // cancel if no files are present
    
    // move folder from sync repo to final repo
    sf.moveMultiple({
        src_repo: config.repos.sync,
        dst_repo: config.repos.final,
        file_names: [config.srcDir],
    }, (err, body) => {
        if(err) return; 

        // rename folder in destination
        let yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');

        sf.renameDirectory({
            repo_id: config.repos.final,
            p: config.srcDir,
            newname: yesterday
        }, (err, body) => {});

        // create new source folder
        sf.createDirectory({
            repo_id: config.repos.sync,
            p: config.srcDir
        }, (err, body) => {});
    });



});


