'use strict';

//var util = require('util');
//var path = require('path');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;
//var yosay = require('yosay');
//var chalk = require('chalk');


var GitgGenerator = yeoman.generators.Base.extend({
    init: function(){
        this.pkg = require('../package.json');

        this.on('end', function (){
            if (!this.options['skip-install']){
                this.installDependencies();
            }
        });
    },

    askFor: function(){
        var done = this.async();

        var prompts = [{
            name: 'projName',
            message: 'Project name?'
        },{
            name: 'projDesc',
            message: 'Project description?'
        },{
            name: 'gitName',
            message: 'Git username?'
        }];

        this.prompt(prompts, function (props){
            this.projName = props.projName;
            this.projDesc = props.projDesc;
            this.gitName = props.gitName;

            done();
        }.bind(this));
    },

    dirStructure: function(){
        this.mkdir(this.projName);
    },

    fileStructure: function(){
        //this.copy('_README.md', this.projName + '/README.md');
        this.write(this.projName + '/package.json', '');
        this.write(this.projName + '/README.md', '<h1>' + this.projName.replace('-', ' ') + '</h1><p>' + this.projDesc + '</p>');
    },

    installs: function(){
        //this.npmInstall(['lodash'], { 'saveDev': true }, done);

        this.log('\n\nInitializing Git repository...');

        var gitInitFunc = function(pName){
            exec('git --git-dir=./' + pName + '/.git --work-tree=./' + pName + ' init');
        }
        gitInitFunc(this.projName);

        // var gitAddFunc = function(pName){
        //     exec('git --git-dir=./' + pName + '/.git --work-tree=./' + pName + ' add README.md');
        // }
        // gitAddFunc(this.projName);
            
            

            //exec('git --git-dir=./' + this.projName + '/.git --work-tree=./' + this.projName + ' add README.md');
            //exec('git --git-dir=./' + this.projName + '/.git --work-tree=./' + this.projName + ' commit -m "initial commit"');

            // exec('git add README.md');
            // exec('git commit -m "initial commit"');
            // exec('git remote add origin https://github.com/' + this.gitName + '/' + this.projName + '.git');
        this.log('\nGit repository has been setup');
    }
});

module.exports = GitgGenerator;
