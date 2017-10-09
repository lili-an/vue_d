import * as _3Des from './3Des'
// import DES3 from './DES3'

// 加解密公私钥
var publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBKUCikS86SHpAtUwchedgKS9uROQVEsFnv7QHQJd+n/ugPHEyZUCm+xKiDOt13HzfDdPXO6KbmBcjHRm1hmqj6VzAJLLYCFsZo/GxLpCimRR4QFGRPzuQFYEldXYdZxAh3XHxwTpvpZsRIhE1ohSKUSV6EcV9eGwoDiIvjk5ZQwIDAQAB"
var privateKey = "MIICXAIBAAKBgQDG0uEUInnth8gXBO1Hw6RrojILsXPxXa/BWHBRxyWB59TwZys41EAylugbC46YOQLXw7gqkHFkFLc9iu+cEMpjJz5xDX12r0UMlSQZDHyx8w5+IB5FroPoCatIiz3SPfXKE8MAkUMcwPc7CheUHMHaZ5he156URd/B9E20RuJ71wIDAQABAoGAM5xB+OwKInKAqhkJTvumDpqHyylBI4JiQRon7dJ4FgSL7euZ+KKAF6G8lmillzYVWtTfVY0xIf2Oo1cRY72oCyb+D2NT4vFckXyoMktcX7+JWWkCQjSACxsYcp0vrYGDTQxOD7UYMjwXVElxhdGgxnsAiH1gtek3ujegcZQtmUECQQD/Dwh88Kqy/yjfjDG456U2IxvZQvyMA6PFSs6C1gbNBD5WVz71QIUKBorNg4S9yfiRFEapzqQ6r11Pedsamhl5AkEAx4630VQPn5Vcf3Rn2ERnoWUUWhAllFocQHiWmY5Wd/lVFz3zClhROXmPqSOSH12bPDJM0aOWFi3+cjm8knE7zwJAVrLAet+/1mpfdWWNPUIYaYeTns1jVSCjmZutCNJBq4zGt8ieUPVmg5rnsaYECBNQV9hhkLT6JCyZ9jsAnFFHWQJAZB8NyL+lKwr0IppTs6T2XXpqUJmDUUA4pnwaCybn6T+2WnfhZZJUBkMgOds35/a9+OC/ u/qYRb6Dx+mB2/Nl7wJBAPSuZo/SCDKPt4kLnxEGhtr1zTtDmpW70Ly3LddJFpDPxufNqlweMaFzmOlXOE/D+/zIYlskO+/mkm6lDBZpixw="
var treasureID = "402216353";
var des3iv = 'treasure';

export function encrypt(treasureData) {
  var key = _3Des.generatorKey(24);
  var obj =treasureData;
  var objStr = JSON.stringify(obj);
  var treasure_data = DES3.encrypt(key,objStr);

  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  var encrypted = encrypt.encrypt(key);

  var dataBuff =  {"treasureID":treasureID,"treasureData":treasure_data,"treasureDESKey":encrypted}
  // var dataBuffJson = JSON.stringify(dataBuff);

  return dataBuff;
}

export function decrypt(treasureData) {
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  var treasureDESKey = treasureData.treasureDESKey;
  var decodered = decrypt.decrypt(treasureDESKey);
  // try{
  var treasure_data = _3Des.dess(decodered,_3Des.base64decode(String(treasureData.treasureData)),0,1,des3iv,0);
  //   var treasure_data = DES3.decrypt(decodered,treasureData.treasureData);
  // }catch(msg)
  // {
  //   alert(msg);
  // }
  return treasure_data;
}