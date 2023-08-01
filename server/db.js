const mongoose = require('mongoose');
const connection = process.env.DBURL;
const collection = process.env.COLL;

const db = async () => {

    try {

        await mongoose.connect(`${connection}/${collection}`);

        console.log(
            `Database connected: ${connection}/${collection}`
        );

    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }

}

module.exports = { db, mongoose }; // exporting both the function and dependency connection.ccc