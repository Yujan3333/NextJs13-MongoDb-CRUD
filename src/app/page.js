// import React from 'react'

// const Page = () => {
//   const variables = process.env.MONGODB_URI;
//   return (
//     <div>Page {variables}</div>
//   )
// }

// export default Page


"use client"

import AddressBook from '../components/AddressBook';

const Home = () => {
  return (
    <>
      <AddressBook />
    </>
  );
};

export default Home;
