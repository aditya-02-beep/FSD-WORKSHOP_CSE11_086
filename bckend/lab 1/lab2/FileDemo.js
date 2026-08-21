import fs from "node:fs/promises";
const filePath="userdata.txt"; 
async function createFile(content) {
    try{
    await fs.writeFile("filePath", content, "utf8");
    console.log("File created successfully!");
    }
    catch(err){
        console.log("Error creating file:", err);
    }
} 
async function readFile() {
    try {
        const content = await fs.readFile(filePath, "utf8");
        console.log("File content:", content);
    } catch (err) {
        console.log("Error reading file:", err);
    }
}
async function appendToFile(content){
    try{
        await fs.appendFile(filePath,content,'UTF-8');
        console.log("Content Appended Successfully");
    }catch(err){
        console.error("Error Appending to File:", err);
    }
}
async function deleteFile(){
    try{
        await fs.unlink(filePath);
        console.log("File Deleted Successfully");
    }catch(err){
        console.error("Error Deleting File:", err);
    }
}
export default {createFile,readFile,appendToFile,deleteFile};
// func calling 
createFile("Hello world ");
readFile();
appendToFile("\nThis is an appended line.");
//deleteFile();

