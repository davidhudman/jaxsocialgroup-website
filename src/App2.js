// https://codesandbox.io/s/react-bootstrap-formik-pb831?from-embed=&file=/src/form-example.js

// https://us05web.zoom.us/j/3958954702?pwd=S1U1WHcvOGpjRGU2ZktVOXo2cnl1dz09

import * as React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Card,
  //   CardHeader,
  CardBody,
  Button,
  //   Label,
  Input,
  //   Col,
  Form,
  Row,
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function App2() {
  // https://formik.org/docs/guides/validation
  const validationSchema = Yup.object().shape({
    invoiceAmount: Yup.number().required("You must enter an amount owed."),
    tipAmmount: Yup.number(),
    description: Yup.string(),
  });

  const handleSubmit = ({ values }) => {
    console.log("values:", values);
    // your api call will go here
  };

  // https://react-bootstrap.github.io/forms/input-group/
  // https://v4.mui.com/
  // https://ant.design/
  return (
    <Card className="xs-4">
      <Formik
        initialValues={{
          invoiceAmount: null,
          tipAmount: null,
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <>
            <>{console.log(values)}</>
            <Form>
              <CardBody>
                <Row>
                  <Input
                    type="input"
                    name="invoiceAmount"
                    id="amntowed"
                    aria-describedby="Amount Owed"
                    placeholder="Amount Owed"
                  />
                </Row>
                <Row>
                  Tip: <input name="tipAmount"></input>
                </Row>
                <Row>
                  Description: <input name="description"></input>
                </Row>
                <Button
                  disabled={values?.invoiceAmount?.length !== null}
                  type="submit"
                >
                  Pay $
                </Button>
              </CardBody>
            </Form>
          </>
        )}
      </Formik>
    </Card>
  );
}
