import React from 'react'

export default function UserImage({user}) {
  return (
    <img src={user.image} alt="" style={{width:"10rem",height:"10rem",borderRadius:"50%"}}/>
  )
}
