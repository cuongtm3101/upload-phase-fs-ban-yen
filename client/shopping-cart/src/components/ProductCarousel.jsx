import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const MyGallery = ({ sources }) => {
  let images = sources.map((e, i) => {
    return { original: e, thumbnail: e };
  });
  return <ImageGallery items={images} />;
};

export default MyGallery;
