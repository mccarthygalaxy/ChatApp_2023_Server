import React from 'react'
import { Col, Navbar, Row, } from 'reactstrap'

export default function Footer() {

    const currentYear = new Date().getFullYear();

  return (
    <>

      {/* <Row> */}

        {/* <Col md="6" sm="6"> */}

          <footer>
                <h6>Upright Project: React Chat Client {currentYear} &copy;</h6>
          </footer>

        {/* </Col> */}
        
      {/* </Row> */}

    </>
  )
}

/* 
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
} */