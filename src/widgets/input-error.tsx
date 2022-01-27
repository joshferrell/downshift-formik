/** @jsxImportSource @emotion/react */
import VisuallyHidden from "./visually-hidden";

type PropTypes = {
  id: string;
  errorMessage?: string;
};

const InputError: React.FC<PropTypes> = ({ errorMessage, id }) => {
  if (!errorMessage) return null;

  return (
    <div id={id}>
      <VisuallyHidden>Error:</VisuallyHidden>
      <div
        css={{
          color: "#BA0430",
          fontWeight: 300,
          fontSize: "14px",
          lineHeight: "22px",
        }}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default InputError;
