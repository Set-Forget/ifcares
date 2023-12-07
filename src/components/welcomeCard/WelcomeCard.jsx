'use client'

import React from 'react'
import { Card } from 'flowbite-react';
import './WelcomeCard.css'

const WelcomeCard = () => {
  return (
    <Card href="#" className="max-w-sm individual-card">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Date
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Site
      </p>
    </Card>
  )
}

export default WelcomeCard