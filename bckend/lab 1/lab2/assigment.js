import fs from "node:fs/promises";

const filePath = "userdata.json";
async function createFile(data) {
    try {
        await fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2),
            "utf8"
        );

        console.log("JSON file created successfully!");

    } catch (err) {
        console.log("Error creating file:", err);
    }
}
async function readFile() {
    try {
        const content = await fs.readFile(filePath, "utf8");

        const data = JSON.parse(content);

        console.log("File content:");
        console.log(data);

    } catch (err) {
        console.log("Error reading file:", err);
    }
}
async function appendToFile(newData) {
    try {
        const content = await fs.readFile(filePath, "utf8");

        const data = JSON.parse(content);
        data.push(newData);

        await fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2),
            "utf8"
        );

        console.log("Data appended successfully!");

    } catch (err) {
        console.error("Error appending data:", err);
    }
}

async function deleteFile() {
    try {
        await fs.unlink(filePath);

        console.log("File deleted successfully!");

    } catch (err) {
        console.error("Error deleting file:", err);
    }
}


export default {
    createFile,
    readFile,
    appendToFile,
    deleteFile
};


// Function calling

await createFile([
    {
        name: "Aditya",
        age: 20
    }
]);

await readFile();

await appendToFile({
    name: "Rahul",
    age: 22
});

await readFile();

// await deleteFile();