module.exports = {

    connect: function(db, io, PORT) {
        var rooms = [];

        const collection = db.collection("groups");

        collection.find({}).toArray(function(err, data) {
            rooms.push(data);
        });
        console.log
    }
}