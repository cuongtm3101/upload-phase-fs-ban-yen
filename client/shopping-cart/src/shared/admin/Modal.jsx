import { Link } from "react-router-dom";
import { useState } from "react";
const ModalBody = () => {
  const [tabs, setTabs] = useState([
    { value: "Assets" },
    { value: "Library" },
    { value: "Upload" },
  ]);
  const [active, setActive] = useState(0);
  const handleChangeTab = (i) => {
    setActive(i);
  };
  return (
    <>
      <div className="col py-3">
        <ul className="nav nav-tabs">
          {tabs.map((e, i) => (
            <li className="nav-item" key={i}>
              <Link
                onClick={() => handleChangeTab(i)}
                className={`nav-link ${i === active ? "active" : ""}`}
              >
                {e.value}
              </Link>
            </li>
          ))}
        </ul>
        <p className="lead">
          An example 2-level sidebar with collasible menu items.
        </p>
        <ul className="list-unstyled">
          <li>
            <h5>Responsive</h5> shrinks in width, hides text labels and
            collapses to icons only on mobile
          </li>
        </ul>
        <div id="grid" class="grid-container">
          <div id="image1" class="griditem image1">
            <p>The background image 1 </p>
          </div>

          <div id="image2" class="griditem image2">
            <p>The background image 2</p>
          </div>
          <div id="image3" class="griditem image3">
            <p>The background image 3 </p>
          </div>
          <div id="image4" class="griditem image4">
            <p>The background-image 4 </p>
          </div>
          <div id="image5" class="griditem image5">
            <p>The background image 5 </p>
          </div>

          <div id="image6" class="griditem image6">
            <p>The background-image 6 </p>
          </div>
          <div id="image7" class="griditem image7">
            <p>The background-image 7 </p>
          </div>
          <div id="image8" class="griditem image8">
            <p>The background-image 8 </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Modal = () => {
  return (
    <div
      className="modal modal-xl"
      tabIndex={-1}
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Images</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div
            className="modal-body row flex-nowrap"
            style={{
              padding: 0,
              padding: "0 12px 0 12px",
              position: "relative",
            }}
          >
            <ModalBody></ModalBody>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
