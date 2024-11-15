const uploadTag = document.querySelector('input');

uploadTag.addEventListener('change', async (e)=> {
    try{
        const file = uploadTag.files[0];
        const chunkedBlobs = createChunks(file, 25);
        const chunkedFiles = createFileFromBlob(chunkedBlobs, file.name);
        chunkedFiles.map((e) => {
            console.log(e);
        })
    }
    catch(e){
        console.log(e);
    }
})
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