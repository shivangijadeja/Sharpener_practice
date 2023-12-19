const socketService = (socket) => {
    socket.on('new-common-message', async()=> {
        socket.broadcast.emit('new-common-message');
        socket.emit('new-common-message');
    })
    socket.on('new-group-message', async()=> {
        socket.broadcast.emit('new-group-message');
        socket.emit('new-group-message');
    })
}

module.exports = socketService