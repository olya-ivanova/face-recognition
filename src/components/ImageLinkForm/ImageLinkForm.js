import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3">
        This Magic Brain will detect faces in your pictures. Give it a try.
      </p>
      <div>
        <div className="center form w-50 pa4 br3 shadow-5">
          <input
            type="text"
            className="center f4 pa2 w-70 center"
            onChange={onInputChange}
          />
          <button
            className="detect-button w-30 grow link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
