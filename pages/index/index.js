//index.js
//获取应用实例
var fun_md5 = require('../../utils/md5.js')
var fun_sha1 = require('../../utils/sha1.js')
var fun_base64 = require('../../utils/base64.js')
var fun_aes = require('../../utils/aes.js')
var app = getApp()
//十六位十六进制数作为秘钥
var key = fun_aes.CryptoJS.enc.Utf8.parse("3454345434543454");  
//十六位十六进制数作为秘钥偏移量
var iv  = fun_aes.CryptoJS.enc.Utf8.parse('6666666666666666');  
Page({
  data: {
    show_md5: '',
    show_sha1: '',
    show_base64_encode: '',
    show_base64_decode: '',
    show_aes_encode: '',
    show_aes_decode: ''
  },
  onLoad: function () {
    //md5加密
    var str_md5 = fun_md5.hex_md5("你叫MINA？")
    //sha1加密
    var str_sha1 = fun_sha1.hex_sha1("你叫MINA？")
    var obj_base64 = new fun_base64.Base64();
    //base64加密
    var str_base64_encode = obj_base64.encode("你叫MINA？");
    //base64解密
    var str_base64_decode = obj_base64.decode(str_base64_encode);
    //aes加密
    var str_aes_encode = this.Encrypt('你叫MINA？')
    //aes解密
    var str_aes_decode = this.Decrypt(str_aes_encode);
    this.setData({
      show_md5: str_md5,
      show_sha1: str_sha1,
      show_base64_encode: str_base64_encode,
      show_base64_decode: str_base64_decode,
      show_aes_encode: str_aes_encode,
      show_aes_decode: str_aes_decode
    })
  },
  Encrypt: function (word) {
    var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  },
  Decrypt: function (word) {
    var encryptedHexStr = fun_aes.CryptoJS.enc.Hex.parse(word);
    var srcs = fun_aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = fun_aes.CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
})
