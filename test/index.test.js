const coreNetworkController = require('../src/index');
const { spawn } = require('child_process');
const path = require('path');

const ipRegex = /^(?!\.)((^|\.)([1-9]?\d|1\d\d|2(5[0-5]|[0-4]\d))){4}$/;

function run(cmd, callback) {
    const command = spawn(cmd);
    let result = '';
    command.stdout.on('data', function (data) {
        result += data.toString();
    });
    command.on('close', function (code) {
        return callback(result);
    });
}

it('Should return an IP address from one of the ping server', async done => {
    const ip = await coreNetworkController();
    expect(ip).toMatch(ipRegex);
    return done();
});

it('Should pipe a new file with the user\'s machine IP address', async done => {
    const modProgramPath = path.resolve(`${process.cwd()}/src/cli/index.js`)
    run(modProgramPath, modReturnText => {
        modReturnText = modReturnText.trim();
        expect(modReturnText).toMatch(ipRegex);
        return done();
    });
});