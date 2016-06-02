'use strict';

var through = require('through2');
var gutil = require('gulp-util');

module.exports = function filelog() {
    var count = 0;

    function decorate(color, text) {
        return text ? '[' + gutil.colors[color](text) + ']' : '';
    }

    return through.obj(function(file, enc, callback) {
        var items = [];
        count++;


        if (file.contents.length == 0) {
            items.push(decorate('yellow', count));
            items.push(decorate('cyan', file.path));

            items.push(decorate('magenta', 'EMPTY'));
        }

        gutil.log(items.join(' '));

        this.push(file);
        return callback();
    }, function(cb) {
        var task = taskParam ? decorate('blue', taskParam) + ' ' : '';
        gutil.log(task + 'Found ' + decorate('yellow', count.toString()) + ' files.');
        cb();
    });
};
