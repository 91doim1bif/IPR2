const { MongoClient } = require("mongodb");

async function main() {
    const uri = 'mongodb+srv://mikailaktuerk99:fU01ACNxVMCzuiP6@customer.p3usn7i.mongodb.net/?retryWrites=true&w=majority&appName=Customer';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("sample_mflix");
        const collections = await database.listCollections().toArray(); // Use listCollections() to list collections
        collections.forEach((collection) => console.log(collection.name)); // Use collection.name to get collection name
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();