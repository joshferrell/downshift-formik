import { Form, Formik } from "formik";
import { Global, css } from "@emotion/react";
import SingleSelect from "./widgets/single-select";
import { object, string } from "yup";
import stateList from "./state-list";

const App = () => {
  const validationSchema = object({
    states: string().required("Select a state"),
  });

  return (
    <>
      <Global
        styles={css`
          html,
          label,
          input,
          li {
            font-family: SF Pro Text, sans-serif;
          }
        `}
      />
      <Formik
        initialValues={{ states: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <SingleSelect label="States" name="states" items={stateList} />
          <button type="submit">submit form</button>
        </Form>
      </Formik>
    </>
  );
};

export default App;
