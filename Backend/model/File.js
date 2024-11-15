import mongoose from 'mongoose';
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/cloudBin');
}
const fileSchema = new mongoose.Schema({
    fileName: String,
    fileSize: String,
    fileType: String,
    groupMessageId: [mongoose.Schema({
        messageId: String
    })]
});

const File = mongoose.model('File', fileSchema);

export default File;