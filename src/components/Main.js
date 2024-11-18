import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Main() {
   const [userDetails, setUserDetails] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);

   const fetchDetails = async () => {
      try {
         const accessToken = Cookies.get('accessToken');
         const response = await axios.get('https://auth-backend-138t.onrender.com/api/v1/users/current-user', {
            headers: {
               Authorization: `Bearer ${accessToken}`
            }
         });

         console.log("Token accessed");
         console.log(response.data.data);
         setUserDetails(response.data.data);
      } catch (err) {
         setError("Fetching user details failed.");
         console.log("Error fetching user details", err);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchDetails();
   }, []);

   if (loading) return <div>Loading...</div>;
   if (error) return <div>{error}</div>;

   return (
      <div>
         <h2>User Details</h2>
         {userDetails ? (
            <div>
               <p>Username: {userDetails.username}</p>
               <p>Email: {userDetails.email}</p>
               <p>Full Name: {userDetails.fullName}</p>
               <p>Phone: {userDetails.phone}</p>
            </div>
         ) : (
            <p>No user details available.</p>
         )}
      </div>
   );
}

export default Main;
