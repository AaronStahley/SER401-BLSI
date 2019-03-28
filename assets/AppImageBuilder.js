let fs = require("fs")

getAppImages = (fileLoc) => {
    //`./assets/images/description_images`
    let dir = fs.readdirSync(fileLoc)

    let code = "export default {\n\r";
    try {
        dir.forEach(loc => {
            let path = fileLoc + '/' + loc;
            let files = fs.readdirSync(path);
            code += compileImages(path, files)
        });
    } catch(e) {
        console.log(e);
    }    
    code += `}\n\r`;

    return fs.writeFile(`src/common/DescriptionImages.js`, code, () => {});
}

compileImages = (fileLoc, files) => {
    let images = '';

    //Build image list
    files.forEach(file => {
        const name = getName(file)
        images += `"${name}" : require("../${fileLoc}/${file}"),\n\r`
    });

    return images;
}

getName = (file) => {
    let name = file.replace(".png", "").toLowerCase();
    let removeSpaces = name.split(" ");
    return condenseArrToStr(removeSpaces);
}

condenseArrToStr = (arr) => {
    let str = "";
    arr.forEach(element => {
        str += element;
    });

    return str;
}

getAppImages("assets/images/description_images")