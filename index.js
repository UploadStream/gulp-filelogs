'use strict';

var through = require('through2');
var gutil = require('gulp-util');

module.exports = function filelog() {
    var count = 0;

    function decorate(color, text) {
        return text ? '[' + gutil.colors[color](text) + ']' : '';
    }

    return through.obj(function(file, enc, callback) {

        if (file.contents.length == 0) {
            var items = [];

            items.push(decorate('yellow', count));
            items.push(decorate('cyan', file.path));

            items.push(decorate('magenta', 'EMPTY'));
            gutil.log(items.join(''));

        }


        this.push(file);
        return callback();
    }, function(cb) {
        cb();
    });
};

