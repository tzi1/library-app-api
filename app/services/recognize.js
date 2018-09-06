const fr = require('face-recognition');
const fs = require('fs');
const path = require('path');

const UserDao = require('../dao/userDao');
const userDao = new UserDao();

const EXT = '.jpg';
const tmpFilePath = 'tempfile.jpg';
const modelFileName = `${__dirname}/../../model.json`;
const predictionTreshold = 0.6;

const recognizer = fr.FaceRecognizer();

bootstrapModel();

function train(users) {
    users.forEach(user => {
        const userFolderPath = __dirname + `/../images/${user.photoPath}`;

        let files = fs.readdirSync(userFolderPath);
        files = files.filter(file => path.extname(file).toLowerCase() === EXT);

        const images = [];
        files.forEach(file => {
            images.push(fr.loadImage(`${userFolderPath}/${file}`));
        });

        console.log(`Adding images for user ${user.alias}...`);

        if (images.length) {
            recognizer.addFaces(images, user.id.toString());
        }
    });
}

function predict(imagePath) {
    const image = fr.loadImage(imagePath);
    // const predictions = recognizer.predict(imagePath);
    const predictions = recognizer.predictBest(image);
    return predictions;
}

function saveModel() {
    console.log('saving model to file...');
    const modelState = recognizer.serialize();
    fs.writeFileSync(modelFileName, JSON.stringify(modelState));
}

function loadModel() {
    if (fs.existsSync(modelFileName)){
        console.log('loading model from file...');
        const modelState = require(modelFileName);
        recognizer.load(modelState);
        return true;
    } else {
        return false;
    }
}

function bootstrapModel() {
    //get all user
    userDao.findAll().then(users => {
        if(!loadModel()){
            train(users);
            saveModel();
        }

        console.log('model bootstraped!');
    })
}

function saveImageToFile(image) {
    var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");

    console.log('writting out fake file');
    fs.writeFileSync(tmpFilePath, base64Data, 'base64', function(err) {
        console.log(err);
    });
}

function recognize(imageFile) {
    saveImageToFile(imageFile);

    const prediction = predict(tmpFilePath);
    fs.unlink(tmpFilePath);
    
    return prediction.distance > predictionTreshold ? -1 : prediction.className;
}

module.exports = {
    recognize: recognize
};