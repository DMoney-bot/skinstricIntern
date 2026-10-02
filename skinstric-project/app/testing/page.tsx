import React from 'react'
import Squares from '../components/squares'
import ButtonArrow from '../components/buttonArrow'
import Link from 'next/link'

export default function TestingPage() {
  return (
    <div className="testingWrapper">
        <div className="testingTitle">
            <h1>To Start Analysis</h1>
        </div>
        <Squares />
        <div className="testingTextWrapper">
            <p className="clickText">Click To Type</p>
            <textarea name="introInput" id="text" placeholder='Introduce Yourself' className='testingNameBox' rows={1}></textarea>
        </div>
        <Link href="" className="backButton">
            <ButtonArrow />
            <div className="backButtonText">Back</div>
        </Link>
    </div>
  )
}
