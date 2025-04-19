import conf from "@/conf/conf";
import CryptoJS from "crypto-js";

const iv = CryptoJS.enc.Utf8.parse(conf?.encryptionIV);
export const encryptString = (string) => {
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(string), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};
