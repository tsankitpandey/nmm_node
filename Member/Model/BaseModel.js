const { uploadFiles ,deleteFiles} = require('../../services/imageUploader');
const EmailSetup = require('../../services/EmailSetup');
const pool = require('../../Utils/db');

class BaseModel {
    static uploadFiles = uploadFiles; 
    static deleteFiles = deleteFiles; 
    static EmailSetup = EmailSetup;   
    static db = pool;  
} 

module.exports = BaseModel;