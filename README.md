
## WebAuthN sample

This is a web application to do demonstration of the passwordless and 2FA authentication using FIDO2 on [clean-starter](https://github.com/PhuongLe/clean-starter) framework.


### Requirements
- [NodeJS 8.15+ installed](https://nodejs.org/en/download/)
- External hardware-based security device such as Yubikey
 
### Setup

1. Start Clean-starter project, working a back-end service, aka playing relying party role. Setup guideline can be found at [here](https://github.com/PhuongLe/clean-starter).
2. On clean starter, configure authentication options on [lib](https://github.com/chinhnguyen/clean-starter/tree/master/app/lib)/[infrastructure](https://github.com/chinhnguyen/clean-starter/tree/master/app/lib/infrastructure)/**config**/authnConfig.json
	```typescript
	{
	"enablePasswordless": true,
	"enable2FAWithFido2": true
	}
	```
3. Start webauthn-sample ```npm start```


### Demonstrations

There are 2 demo pages as follows
1. [passwordless-demo](http://localhost:8081/passwordless-demo.html): This authentication is to demonstrate that users can be authenticated without UPN. 
To enable this option, setting "enablePasswordless" must be set to True.
2. [2fa-demo](http://localhost:8081/2fa-demo.html): This authentication is to demonstrate that users will be authenticated with an external authenticator right after being authenticated with UPN credentials. 
To enable this option, setting "enable2FAWithFido2" must be set to True.


### References
1. Thanks to Wallix, this project used his [library](https://github.com/wallix/webauthn) to call the CTAP APIs