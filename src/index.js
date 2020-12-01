import { solveRegistrationChallenge, solveLoginChallenge } from '@webauthn/client';

const upnLoginButton = document.getElementById('upnlogin');
const loginButton = document.getElementById('login');
const registerButton = document.getElementById('register');
const logDiv = document.getElementById('logId');
const messageDiv = document.getElementById('messageId');
const instructionDiv = document.getElementById('2fa-instruction');

function getUsername(){
    return document.getElementById("username").value
}

function getPassword(){
    return document.getElementById("password").value
}

const appendLog = message => {
    logDiv.innerHTML += '</br>' + message;
}

function showLoginButton(enable){
    if (enable)
        loginButton.style.display = 'block';
    else
        loginButton.style.display = 'none';    
}

const updateLoginInstruction = message =>{
    instructionDiv.innerHTML = message
}

function addHeadline(text){
    var title = document.createElement('div');
    title.style.fontWeight = 'bold';
    messageDiv.appendChild(title).innerHTML 
        = text;
}
function appendMessage(title, jsonObject){
    addHeadline(title);
    messageDiv.appendChild(document.createElement('pre')).innerHTML = JSON.stringify(jsonObject,null,4);
    messageDiv.appendChild(document.createElement('div')).innerHTML = "</br>";
}
function cleanLog(){
    messageDiv.innerHTML = "";
    logDiv.innerHTML = "Logged messages: ";
}

upnLoginButton.onclick = async() => {
    cleanLog();

    const upnResponse = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: {
            'content-type': 'Application/Json'
        },
        body: JSON.stringify({email: getUsername(), password: getPassword()})
    })
    .then(response => response.json());
    
    if (upnResponse.issuedToken == undefined){
        appendMessage("UPN authentication response", upnResponse);
        appendLog('- UPN login unsuccessfullly.')
        return
    }

    appendLog('- UPN login successfullly.')

    var issuedToken = JSON.parse(upnResponse.issuedToken);
    if (issuedToken.attestation != undefined){
        doRegistration(issuedToken);
        updateLoginInstruction("new hardware-based security key is registered, now you can login using FIDO 2 authentication.")
        showLoginButton(true);
    }else{
        updateLoginInstruction("the hardware-based security key is already registered, now you can login using FIDO 2 authentication.")
        doLogin(issuedToken);
    }
}

registerButton.onclick = async () => {
    cleanLog();

    const attestationRequest = await fetch('http://localhost:8080/request-register', {
        method: 'POST',
        headers: {
            'content-type': 'Application/Json'
        },
        body: JSON.stringify({email: getUsername()})
    })
    .then(response => response.json());

    doRegistration(attestationRequest);
};


async function doRegistration(attestationRequest){
    appendMessage("Attestation request/registration challenge request", attestationRequest);
    appendLog('- Server send register challenge request to client.');

    //start doing attestation validation
    const credentials = await solveRegistrationChallenge(attestationRequest);

    appendMessage("Attestation response/registration challenge response", credentials);

    appendLog('- Authenticate with external authenticator secceeded. ')
    appendLog('- Client send register challenge response to server.');

    //doing attestation validation
    const registrationResponse = await fetch(
        'http://localhost:8080/register', 
        {
            method: 'POST',
            headers: {
                'content-type': 'Application/Json'
            },
            body: JSON.stringify(credentials)
        }
    ).then(response => response.json());

    if (registrationResponse.registerStatus != undefined && registrationResponse.registerStatus == true) {
        appendLog('- Registration succeeded');
        return;
    }
    appendLog('- Registration failed');
    appendMessage('Error response', registrationResponse);
}

loginButton.onclick = async () => {
    const assertionRequest = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'content-type': 'Application/Json'
        },
        body: JSON.stringify({ email: getUsername()})
    })
    .then(response => response.json());

    doLogin(assertionRequest);
};

async function doLogin(assertionRequest){
    appendMessage('Assertion request/login request', assertionRequest);
    appendLog('- Server send login challenge request to client.');

    const credentials = await solveLoginChallenge(assertionRequest);

    appendMessage('Assertion response/login response', credentials);
    appendLog('- Authenticate with external authenticator succeeded. ')
    appendLog('- Client send login challenge response to server.');
    
    const loggedIn = await fetch(
        'http://localhost:8080/login-challenge', 
        {
            method: 'POST',
            headers: {
                'content-type': 'Application/Json'
            },
            body: JSON.stringify(credentials)
        }
    ).then(response => response.json());

    if (loggedIn.issuedToken != undefined) {
        appendLog('- Login succeeded');
        var issueToken = JSON.parse(loggedIn.issuedToken);
        appendMessage('Issued token response', issueToken);

        return;
    }
    appendLog('- Login failed');
    appendMessage('Error response', loggedIn);
}
