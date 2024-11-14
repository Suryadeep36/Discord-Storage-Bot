const uploadTag = document.querySelector('input');

uploadTag.addEventListener('change', async (e)=> {
    try{
        const file = uploadTag.files[0];
        const fileName = file.name;
        const fileType = file.type;
        const chunkedBlobs = createChunks(file, 1);
        const chunkedFiles = createFileFromBlob(chunkedBlobs, fileName);
        let encodedBase64Chunks = await Promise.all(
            chunkedFiles.map(async (file) => {
                let encodedFile = await encodeFile(file);
                return encodedFile;
            })
        );
        console.log(encodedBase64Chunks); 
        let decodedFiles = [];
        encodedBase64Chunks.map((base64Chunk, i)=> {
            const [fileNameWithOutExtension, extension] = fileName.split('.');
            decodedFiles.push(decodeFile(base64Chunk, fileNameWithOutExtension + "-" + i + extension, fileType));
        })
        console.log(decodedFiles);
    }
    catch(e){
        console.log(e);
    }
})


function encodeFile(file){
    return new Promise((resolve, reject)=> {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = () => {
            reject("Error occured");
        }
    }) 
}

function decodeFile(base64Data, fileName, mimeType) {
    console.log(fileName);
    const base64String = base64Data.split(',')[1];
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: mimeType });
}

function createChunks(file, chuckSizeInMb){
    const chunkSize = chuckSizeInMb * 1e6;
    const chunkedBlobs = [];
    let start = 0;

    while (start < file.size) {
        let end = Math.min(start + chunkSize, file.size);
        chunkedBlobs.push(file.slice(start, end));
        start = end;
    }

    return chunkedBlobs;
}

function createFileFromBlob(chunkedBlobs, filename){
    let chunkedFiles = [];
    let filenameWithOutExtension = filename.split('.')[0];
    let extension = filename.split('.')[1];
    chunkedBlobs.map((e, i) => {
        chunkedFiles.push(new File([e], filenameWithOutExtension + "-" + i + "." + extension));
    })
    return chunkedFiles;
}