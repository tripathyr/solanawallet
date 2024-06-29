(function (EXPORTS) { //floEthereum v1.0.1a
    /* FLO Ethereum Operators */
    /* Make sure you added Taproot, Keccak, FLO and BTC Libraries before */
    'use strict';
    const floSolana = EXPORTS;

var bs58 = (function() {
    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const BASE = ALPHABET.length;

    // Convert a byte array to a Base58 string
    function encode(buffer) {
        if (buffer.length === 0) return '';

        // Convert byte array to a BigInt
        let intVal = BigInt(0);
        for (let i = 0; i < buffer.length; i++) {
            intVal = intVal * BigInt(256) + BigInt(buffer[i]);
        }

        // Convert BigInt to Base58 string
        let result = '';
        while (intVal > 0) {
            const remainder = intVal % BigInt(BASE);
            intVal = intVal / BigInt(BASE);
            result = ALPHABET[Number(remainder)] + result;
        }

        // Add '1' for each leading 0 byte in the byte array
        for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
            result = ALPHABET[0] + result;
        }

        return result;
    }

    // Convert a Base58 string to a byte array
    function decode(string) {
        if (string.length === 0) return new Uint8Array();

        // Convert Base58 string to BigInt
        let intVal = BigInt(0);
        for (let i = 0; i < string.length; i++) {
            const charIndex = ALPHABET.indexOf(string[i]);
            if (charIndex < 0) {
                throw new Error('Invalid Base58 character');
            }
            intVal = intVal * BigInt(BASE) + BigInt(charIndex);
        }

        // Convert BigInt to byte array
        const byteArray = [];
        while (intVal > 0) {
            byteArray.push(Number(intVal % BigInt(256)));
            intVal = intVal / BigInt(256);
        }

        // Reverse the byte array and add leading zeros
        byteArray.reverse();
        for (let i = 0; i < string.length && string[i] === ALPHABET[0]; i++) {
            byteArray.unshift(0);
        }

        return Uint8Array.from(byteArray);
    }

    return { encode, decode };
})();
    
    const solanaSeed2SolanaAddress =  floSolana.solanaSeed2SolanaAddress = function(solanaSeed){
    var k1,k2,k3,k4,k5;
    
    k2 = Crypto.util.hexToBytes(solanaSeed);
    k3 = Uint8Array.from(k2);
    k4 = solanaWeb3.Keypair.fromSeed(k3);
    k5 = k4.publicKey.toString();
    return k5;
};

/*floSolana.solanaSeedUint82wif = function(solanaSeedUint8){
    var k1,k2,k3,k4;
    k1 = solanaWeb3.Keypair.fromSeed(solanaSeedUint8);
    k2 = Array.from(k1.secretKey);
    k3 = k2.slice(0,32);
    k4 = coinjs.privkey2wif(k3);
    return k4;
};*/

// isFLO = true for FLO wif, omit this for Bitcoin wif
const solanaSeed2wif = floSolana.solanaSeed2wif = function(solanaSeed,isFLO){
    var p1,p2,k1,k2,k3,k4,k5,temp;
    p1 = Crypto.util.hexToBytes(solanaSeed);
    p2 = Uint8Array.from(p1);
    k1 = solanaWeb3.Keypair.fromSeed(p2);
    k2 = Array.from(k1.secretKey);
    k3 = k2.slice(0,32);
    k4 = Crypto.util.bytesToHex(k3);
    coinjs.compressed = true;
    temp = coinjs.priv;
    if (isFLO == true) {coinjs.priv = 0xa3};
    k5 = coinjs.privkey2wif(k4);
    coinjs.priv = temp;
    return k5;
};


const solanaSeed2SolanaSecret = floSolana.solanaSeed2SolanaSecret = function (solanaSeed){
    var p1,p2,k1,k2,k3,k4,k5,temp;
    p1 = Crypto.util.hexToBytes(solanaSeed);
    p2 = Uint8Array.from(p1);
    k1 = solanaWeb3.Keypair.fromSeed(p2);
    k2 = k1.secretKey;
    k3 = bs58.encode(k2);
    return k3;    
}

/*floSolana.wif2SolanaSeedUint8 = function(wif){
    var k1,k2,k3;
    k1 = coinjs.wif2privkey(wif);
    k2 = Crypto.util.hexToBytes(k1.privkey);
    k3 = Uint8Array.from(k2);
    return k3;
};*/

const solanaSeed2UsableInCode = floSolana.solanaSeed2UsableInCode = function(solanaSeed){
    var k1,k2,k3;
    k2 = C = rypto.util.hexToBytes(solanaSeed);
    k3 = Uint8Array.from(k2);
    return k3;
    }


const wif2SolanaSeed = floSolana.wif2SolanaSeed = function(wif){
    var k1;
    k1 = coinjs.wif2privkey(wif);
    return k1.privkey;
};


const wif2SolanaAddress = floSolana.wif2SolanaAddress = function(wif){
    var k1,k2,k3,k4,k5;
    k1 = coinjs.wif2privkey(wif);
    k2 = Crypto.util.hexToBytes(k1.privkey);
    k3 = Uint8Array.from(k2);
    k4 = solanaWeb3.Keypair.fromSeed(k3);
    k5 = k4.publicKey.toString();
    return k5;
};

const wif2SolanaSecret = floSolana.wif2SolanaSecret = function(wif){
    var k1,k2;
    k1 = coinjs.wif2privkey(wif);
    k2 = floSolana.solanaSeed2SolanaSecret(k1.privkey);
    return k2;
};

const solanaSecret2SolanaSeed = floSolana.solanaSecret2SolanaSeed = function (solanaSecret){
    var p1,p2,k1;
    p1 = bs58.decode(solanaSecret);
    p2 = p1.slice(0,32);
    k1 = Array.from(p2);
    k2 = Crypto.util.bytesToHex(k1);
    return k2;  
}


const solanaSecret2SolanaAddress = floSolana.solanaSecret2SolanaAddress = function (solanaSecret){
    var p1,p2;
    p1 = floSolana.solanaSecret2SolanaSeed(solanaSecret);
    p2 = floSolana.solanaSeed2SolanaAddress(p1);
    return p2;  
}

const solanaSecret2UsableInCode = floSolana.solanaSecret2UsableInCode = function(solanaSecret){
   return bs58.decode(solanaSecret);
   } 



// isFLO = true for FLO wif, omit this for Bitcoin wif
const solanaSecret2wif = floSolana.solanaSecret2wif = function(solanaSecret,isFLO){
    var p1,p2,k1,k2,k3,k4,k5,temp;
    p1 = floSolana.solanaSecret2SolanaSeed(solanaSecret);
    p2 = floSolana.solanaSeed2wif(p1,isFLO);
    return p2;
};


const solanaAddress2UsableInCode = floSolana.solanaAddress2UsableInCode = function(solanaAddress){
    return new solanaWeb3.PublicKey(solanaAddress);
   }   



const solanaAddressDecode = floSolana.solanaAddressDecode = function(solanaAddress){
    return bs58.decode(solanaAddress);
   } 

const bs58Decode = floSolana.bs58Decode = function(bs58EncodedString) {
    return bs58.decode(bs58EncodedString);
}

const bs58Encode = floSolana.bs58Encode = function(data_string) {
    return bs58.encode(data_string);
}

  
})('object' === typeof module ? module.exports : window.floSolana = {});