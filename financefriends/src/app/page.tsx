'use client'
import Image from "next/image"
import { WalletIcon } from "@heroicons/react/16/solid"
import { ListBulletIcon } from "@heroicons/react/16/solid"
import React, { useState } from 'react'

export default function Home() {

  const [isVisibleW, setIsVisibleW] = useState(true)
  const toggleVisibilityW = () => {
    setIsVisibleW(prevState => !prevState)
  }
  const [isVisibleT, setIsVisibleT] = useState(true)
  const toggleVisibilityT = () => {
    setIsVisibleT(prevState => !prevState)
  }


  return (
    <main className="h-full bg-white">
      <div className="flex justify-between w-full h-8 bg-gradient-to-r from-[#2DE1FC] to-[#5887FF] text-xl text-white py-8 px-4">
        <div onClick={toggleVisibilityW} className="flex font-medium items-center">
          <WalletIcon className="h-8 w-8 mr-4"></WalletIcon>
          <p>Wallet</p>
        </div>
        <div onClick={toggleVisibilityT} className="flex font-medium items-center">
          <p>Tasks</p>
          <ListBulletIcon className="h-8 w-8 ml-4"></ListBulletIcon>
        </div>
      </div>
      <div  className={`flex justify-between w-full text-black h-full transition-transform duration-300 ease-in-out ${isVisibleW ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
        <div id="budget" className="bg-[#2DE1FC] bg-opacity-50 w-1/3 h-full text-black">
          <div className="m-4 bg-white rounded-xl h-4/5 p-4 shadow-xl">
            <p className="text-3xl font-medium">My Budget: </p>
            <p className="text-2xl font-medium">My Transactions:</p>
            <p className="text-2xl font-medium">Remaining Balance: </p>
          </div>
        </div>
        {isVisibleT && <div id="tasks" className="bg-[#5887FF] bg-opacity-50 w-1/3 h-full">
          <div className="m-4 bg-white rounded-xl h-4/5 p-4 shadow-xl">
            <p className="text-3xl font-medium">My Tasks: </p>
          </div>
        </div> }
      </div>
    </main>
  );
}
