import React from 'react'
import { Navbar } from 'reactstrap'

export default function Footer() {

    const currentYear = new Date().getFullYear();

  return (
    <>
    <Navbar className="my-2"
      // color="secondary"
      // dark
      // style={{backgroundColor: "blue"}}
      style={{textAlign: "center"}}
      >
              <h6>Upright Project: React Chat Client {currentYear} &copy;</h6>

    </Navbar>
    </>
  )
}