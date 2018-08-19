let io = "";

var onStart = (socket) => {

	io = socket;

	console.log("Socket Id:" + socket.id);

	socket.on("newEvent", (data, callback) => {

		callback(data);
	})
}

module.exports = {onStart};