import React from 'react'

export default function ProfilePage() {
  return (
    <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
        <p>Profile</p>
        <p>Order History</p>
        <p>Card Details</p>
        <p>My Favourites</p>
        <p>Sign Out</p>
      </div>
      <div>
        <h2>Profile</h2>
        <div>
          <div>
            <p>Browsed Items</p>
            <p>Order Count</p>
          </div>
          <div>
            <p>Loved Items</p>
            <p>Reviewed</p>
          </div>
        </div>
        <div style={{display:"flex"}}>
          <div>
            Browsing History
            <p>Laptop</p>
            <p>Shirts</p>
            <p>Iphone </p>
            </div>
          <div>
            Your Review

            <p>Here is your Review</p>
          </div>
        </div>
      </div>
      <div>
        <p>Profile Image</p>
        <p>User Name</p>
        <p>User EmailId</p>
        <p>User Contact Number</p>
        <p>User Address</p>
      </div>
    </div>
  )
}
