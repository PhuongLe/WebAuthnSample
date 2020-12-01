/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@webauthn/client/src/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@webauthn/client/src/index.js ***!
  \****************************************************/
/*! exports provided: solveRegistrationChallenge, solveLoginChallenge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _solveRegistrationChallenge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./solveRegistrationChallenge */ \"./node_modules/@webauthn/client/src/solveRegistrationChallenge.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"solveRegistrationChallenge\", function() { return _solveRegistrationChallenge__WEBPACK_IMPORTED_MODULE_0__[\"solveRegistrationChallenge\"]; });\n\n/* harmony import */ var _solveLoginChallenge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./solveLoginChallenge */ \"./node_modules/@webauthn/client/src/solveLoginChallenge.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"solveLoginChallenge\", function() { return _solveLoginChallenge__WEBPACK_IMPORTED_MODULE_1__[\"solveLoginChallenge\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./node_modules/@webauthn/client/src/index.js?");

/***/ }),

/***/ "./node_modules/@webauthn/client/src/solveLoginChallenge.js":
/*!******************************************************************!*\
  !*** ./node_modules/@webauthn/client/src/solveLoginChallenge.js ***!
  \******************************************************************/
/*! exports provided: solveLoginChallenge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"solveLoginChallenge\", function() { return solveLoginChallenge; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./node_modules/@webauthn/client/src/utils.js\");\n\n\nconst loginChallengeToPublicKey = getAssert => {\n    const { Unibabel } = __webpack_require__(/*! unibabel */ \"./node_modules/unibabel/index.js\");\n\n    return {\n        ...getAssert,\n        challenge: Unibabel.base64ToBuffer(getAssert.challenge),\n        allowCredentials: getAssert.allowCredentials.map(allowCredential => ({\n            ...allowCredential,\n            id: Unibabel.base64ToBuffer(allowCredential.id),\n        })),\n    };\n};\n\nconst solveLoginChallenge = async credentialsChallengeRequest => {\n    const publicKey = loginChallengeToPublicKey(credentialsChallengeRequest);\n\n    // @ts-ignore\n    const credentials = await navigator.credentials.get({\n        publicKey,\n    });\n\n    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"publicKeyCredentialToJSON\"])(credentials);\n};\n\n//# sourceURL=webpack:///./node_modules/@webauthn/client/src/solveLoginChallenge.js?");

/***/ }),

/***/ "./node_modules/@webauthn/client/src/solveRegistrationChallenge.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@webauthn/client/src/solveRegistrationChallenge.js ***!
  \*************************************************************************/
/*! exports provided: solveRegistrationChallenge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"solveRegistrationChallenge\", function() { return solveRegistrationChallenge; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./node_modules/@webauthn/client/src/utils.js\");\n\n\nconst registrationChallengeToPublicKey = credentialsChallengeRequest => {\n    const { Unibabel } = __webpack_require__(/*! unibabel */ \"./node_modules/unibabel/index.js\");\n\n    return {\n        ...credentialsChallengeRequest,\n        challenge: Unibabel.base64ToBuffer(\n            credentialsChallengeRequest.challenge\n        ),\n        user: {\n            ...credentialsChallengeRequest.user,\n            id: Unibabel.base64ToBuffer(credentialsChallengeRequest.user.id),\n        },\n    };\n};\n\nconst solveRegistrationChallenge = async credentialsChallengeRequest => {\n    const publicKey = registrationChallengeToPublicKey(\n        credentialsChallengeRequest\n    );\n    const credentials = await navigator.credentials.create({\n        publicKey,\n    });\n\n    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"publicKeyCredentialToJSON\"])(credentials);\n};\n\n//# sourceURL=webpack:///./node_modules/@webauthn/client/src/solveRegistrationChallenge.js?");

/***/ }),

/***/ "./node_modules/@webauthn/client/src/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/@webauthn/client/src/utils.js ***!
  \****************************************************/
/*! exports provided: publicKeyCredentialToJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"publicKeyCredentialToJSON\", function() { return publicKeyCredentialToJSON; });\nconst publicKeyCredentialToJSON = (\n    item\n) => {\n    if (item instanceof Array) {\n        return item.map(publicKeyCredentialToJSON);\n    }\n\n    if (item instanceof ArrayBuffer) {\n        const { Unibabel } = __webpack_require__(/*! unibabel */ \"./node_modules/unibabel/index.js\");\n        // ArrayBuffer must be converted to typed arrays\n        return Unibabel.bufferToBase64(new Uint8Array(item));\n    }\n\n    if (item instanceof Object) {\n        const obj = {};\n\n        // tslint:disable-next-line\n        for (const key in item) {\n            obj[key] = publicKeyCredentialToJSON(item[key]);\n        }\n\n        return obj;\n    }\n\n    return item;\n};\n\n//# sourceURL=webpack:///./node_modules/@webauthn/client/src/utils.js?");

/***/ }),

/***/ "./node_modules/unibabel/index.js":
/*!****************************************!*\
  !*** ./node_modules/unibabel/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {(function (exports) {\n'use strict';\n\nfunction utf8ToBinaryString(str) {\n  var escstr = encodeURIComponent(str);\n  // replaces any uri escape sequence, such as %0A,\n  // with binary escape, such as 0x0A\n  var binstr = escstr.replace(/%([0-9A-F]{2})/g, function(match, p1) {\n    return String.fromCharCode(parseInt(p1, 16));\n  });\n\n  return binstr;\n}\n\nfunction utf8ToBuffer(str) {\n  var binstr = utf8ToBinaryString(str);\n  var buf = binaryStringToBuffer(binstr);\n  return buf;\n}\n\nfunction utf8ToBase64(str) {\n  var binstr = utf8ToBinaryString(str);\n  return btoa(binstr);\n}\n\nfunction binaryStringToUtf8(binstr) {\n  var escstr = binstr.replace(/(.)/g, function (m, p) {\n    var code = p.charCodeAt(0).toString(16).toUpperCase();\n    if (code.length < 2) {\n      code = '0' + code;\n    }\n    return '%' + code;\n  });\n\n  return decodeURIComponent(escstr);\n}\n\nfunction bufferToUtf8(buf) {\n  var binstr = bufferToBinaryString(buf);\n\n  return binaryStringToUtf8(binstr);\n}\n\nfunction base64ToUtf8(b64) {\n  var binstr = atob(b64);\n\n  return binaryStringToUtf8(binstr);\n}\n\nfunction bufferToBinaryString(buf) {\n  var binstr = Array.prototype.map.call(buf, function (ch) {\n    return String.fromCharCode(ch);\n  }).join('');\n\n  return binstr;\n}\n\nfunction bufferToBase64(arr) {\n  var binstr = bufferToBinaryString(arr);\n  return btoa(binstr);\n}\n\nfunction binaryStringToBuffer(binstr) {\n  var buf;\n\n  if ('undefined' !== typeof Uint8Array) {\n    buf = new Uint8Array(binstr.length);\n  } else {\n    buf = [];\n  }\n\n  Array.prototype.forEach.call(binstr, function (ch, i) {\n    buf[i] = ch.charCodeAt(0);\n  });\n\n  return buf;\n}\n\nfunction base64ToBuffer(base64) {\n  var binstr = atob(base64);\n  var buf = binaryStringToBuffer(binstr);\n  return buf;\n}\n\nexports.Unibabel = {\n  utf8ToBinaryString: utf8ToBinaryString\n, utf8ToBuffer: utf8ToBuffer\n, utf8ToBase64: utf8ToBase64\n, binaryStringToUtf8: binaryStringToUtf8\n, bufferToUtf8: bufferToUtf8\n, base64ToUtf8: base64ToUtf8\n, bufferToBinaryString: bufferToBinaryString\n, bufferToBase64: bufferToBase64\n, binaryStringToBuffer: binaryStringToBuffer\n, base64ToBuffer: base64ToBuffer\n\n// compat\n, strToUtf8Arr: utf8ToBuffer\n, utf8ArrToStr: bufferToUtf8\n, arrToBase64: bufferToBase64\n, base64ToArr: base64ToBuffer\n};\n\n}( true && exports || 'undefined' !== typeof window && window || global));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/unibabel/index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _webauthn_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @webauthn/client */ \"./node_modules/@webauthn/client/src/index.js\");\n\n\nconst upnLoginButton = document.getElementById('upnlogin');\nconst loginButton = document.getElementById('login');\nconst registerButton = document.getElementById('register');\nconst logDiv = document.getElementById('logId');\nconst messageDiv = document.getElementById('messageId');\nconst instructionDiv = document.getElementById('2fa-instruction');\n\nfunction getUsername(){\n    return document.getElementById(\"username\").value\n}\n\nfunction getPassword(){\n    return document.getElementById(\"password\").value\n}\n\nconst appendLog = message => {\n    logDiv.innerHTML += '</br>' + message;\n}\n\nfunction showLoginButton(enable){\n    if (enable)\n        loginButton.style.display = 'block';\n    else\n        loginButton.style.display = 'none';    \n}\n\nconst updateLoginInstruction = message =>{\n    instructionDiv.innerHTML = message\n}\n\nfunction addHeadline(text){\n    var title = document.createElement('div');\n    title.style.fontWeight = 'bold';\n    messageDiv.appendChild(title).innerHTML \n        = text;\n}\nfunction appendMessage(title, jsonObject){\n    addHeadline(title);\n    messageDiv.appendChild(document.createElement('pre')).innerHTML = JSON.stringify(jsonObject,null,4);\n    messageDiv.appendChild(document.createElement('div')).innerHTML = \"</br>\";\n}\nfunction cleanLog(){\n    messageDiv.innerHTML = \"\";\n    logDiv.innerHTML = \"Logged messages: \";\n}\n\nupnLoginButton.onclick = async() => {\n    cleanLog();\n\n    const upnResponse = await fetch('http://localhost:8080/authenticate', {\n        method: 'POST',\n        headers: {\n            'content-type': 'Application/Json'\n        },\n        body: JSON.stringify({email: getUsername(), password: getPassword()})\n    })\n    .then(response => response.json());\n    \n    if (upnResponse.issuedToken == undefined){\n        appendMessage(\"UPN authentication response\", upnResponse);\n        appendLog('- UPN login unsuccessfullly.')\n        return\n    }\n\n    appendLog('- UPN login successfullly.')\n\n    var issuedToken = JSON.parse(upnResponse.issuedToken);\n    if (issuedToken.attestation != undefined){\n        doRegistration(issuedToken);\n        updateLoginInstruction(\"new hardware-based security key is registered, now you can login using FIDO 2 authentication.\")\n        showLoginButton(true);\n    }else{\n        updateLoginInstruction(\"the hardware-based security key is already registered, now you can login using FIDO 2 authentication.\")\n        doLogin(issuedToken);\n    }\n}\n\nregisterButton.onclick = async () => {\n    cleanLog();\n\n    const attestationRequest = await fetch('http://localhost:8080/request-register', {\n        method: 'POST',\n        headers: {\n            'content-type': 'Application/Json'\n        },\n        body: JSON.stringify({email: getUsername()})\n    })\n    .then(response => response.json());\n\n    doRegistration(attestationRequest);\n};\n\n\nasync function doRegistration(attestationRequest){\n    appendMessage(\"Attestation request/registration challenge request\", attestationRequest);\n    appendLog('- Server send register challenge request to client.');\n\n    //start doing attestation validation\n    const credentials = await Object(_webauthn_client__WEBPACK_IMPORTED_MODULE_0__[\"solveRegistrationChallenge\"])(attestationRequest);\n\n    appendMessage(\"Attestation response/registration challenge response\", credentials);\n\n    appendLog('- Authenticate with external authenticator secceeded. ')\n    appendLog('- Client send register challenge response to server.');\n\n    //doing attestation validation\n    const registrationResponse = await fetch(\n        'http://localhost:8080/register', \n        {\n            method: 'POST',\n            headers: {\n                'content-type': 'Application/Json'\n            },\n            body: JSON.stringify(credentials)\n        }\n    ).then(response => response.json());\n\n    if (registrationResponse.registerStatus != undefined && registrationResponse.registerStatus == true) {\n        appendLog('- Registration succeeded');\n        return;\n    }\n    appendLog('- Registration failed');\n    appendMessage('Error response', registrationResponse);\n}\n\nloginButton.onclick = async () => {\n    const assertionRequest = await fetch('http://localhost:8080/login', {\n        method: 'POST',\n        headers: {\n            'content-type': 'Application/Json'\n        },\n        body: JSON.stringify({ email: getUsername()})\n    })\n    .then(response => response.json());\n\n    doLogin(assertionRequest);\n};\n\nasync function doLogin(assertionRequest){\n    appendMessage('Assertion request/login request', assertionRequest);\n    appendLog('- Server send login challenge request to client.');\n\n    const credentials = await Object(_webauthn_client__WEBPACK_IMPORTED_MODULE_0__[\"solveLoginChallenge\"])(assertionRequest);\n\n    appendMessage('Assertion response/login response', credentials);\n    appendLog('- Authenticate with external authenticator succeeded. ')\n    appendLog('- Client send login challenge response to server.');\n    \n    const loggedIn = await fetch(\n        'http://localhost:8080/login-challenge', \n        {\n            method: 'POST',\n            headers: {\n                'content-type': 'Application/Json'\n            },\n            body: JSON.stringify(credentials)\n        }\n    ).then(response => response.json());\n\n    if (loggedIn.issuedToken != undefined) {\n        appendLog('- Login succeeded');\n        var issueToken = JSON.parse(loggedIn.issuedToken);\n        appendMessage('Issued token response', issueToken);\n\n        return;\n    }\n    appendLog('- Login failed');\n    appendMessage('Error response', loggedIn);\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });