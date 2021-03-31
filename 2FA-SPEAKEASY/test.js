const { time } = require('speakeasy');
var totp = require('totp-generator');
 
var token = totp('JBSWY3DPEHPK3PXP', {digits: 8});
console.log(token); // prints an 8-digit token

