import React from 'react'
import Room from './Room'

function RoomList({rooms}) {
  return (
    <div>
        {rooms && rooms.map(room => (<Room key={room._id} name ={room.name}/>))}
    </div>
  )
}

export default RoomList