const users = [];
const addUser = ({ socket_id, name, user_id, room_id }) => {
    const exist = users.find(user => user.room_id === room_id && (user.user_id === user_id || user.socket_id === socket_id));
    if (exist) {
        console.error('User already exists in this room', exist);
        return { error: 'User already exists in this room' };
    }

    const user = { socket_id, name, user_id, room_id };
    users.push(user);
    console.log('User added:', user);
    console.log('Users list:', users);
    return { user };
};

const removeUser = (socket_id) => {
    const index = users.findIndex(user => user.socket_id === socket_id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (socket_id, room_id) => {
    return users.find(user => user.socket_id === socket_id && user.room_id === room_id);
};

module.exports = {addUser, removeUser, getUser}