import { FC, useEffect, useRef, useState } from "react";
import * as Styled from "./styles/Images.styles";
import CharacterApi from "../../dist/api/CharacterApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ImagesUriModel } from "../../dist/models/ImagesUriModel";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { CustomModal } from "../../components/Modal/Modal";
import Typography from "../../components/Typography/Typography";
import { Button } from "../../components/Button/Button";
import DeleteImagesRequestModel from "../../dist/models/DeleteImagesRequestModel";
import { toast } from "react-toastify";
import { LuImagePlus } from "react-icons/lu";
import UploadFileRequestModel from "../../dist/models/UploadFileRequestModel";
import { Spinner } from "../../components/Spinner/Spinner";
import RequireAuth from "../../access/RequireAuth";
const ImagesSheetPage: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const user = useSelector((state: RootState) => state.account.user);
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const [images, setImages] = useState<ImagesUriModel>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteImage, setDeleteImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    if(user && token && user.characterId){
      CharacterApi.GetImagesAsync(token.access_token, url, user.characterId).then(response => {
        if(response.isError){
          toast.error('Failed to fetch Images');
        }
        else{
            setImages(response.data!);
        }
        setLoading(false);
      }).catch(error => {
        console.log(error)
        setLoading(false);
        toast.error('Something went wrong');
      })
    }
    else{
        setLoading(false);
    }
    if (images?.images.length) {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
    }
}, [user, token]);
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "ArrowLeft") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images?.images.length! - 1 : prevIndex - 1
      );
    } else if (event.code === "ArrowRight") {
      setCurrentIndex((prevIndex) =>
        prevIndex === images?.images.length! - 1 ? 0 : prevIndex + 1
      );
    }
  };
  const handleCancel = (): void => {
    setDeleteImage("");
    setOpen(false);
  };
  const handleDelete = (path: string): void => {
    setDeleteImage(path);
    setOpen(true);
  };
  const submitDelete = async (): Promise<void> => {
    try {
      const request: DeleteImagesRequestModel = {
        id: user?.characterId!,
        paths: [deleteImage],
      };
      const response = await CharacterApi.DeleteImagesAsync(
        token?.access_token!,
        url,
        request
      );
      if (response.isError) {
        toast.error("Could not delete image");
      } else {
        toast.success("Image deleted");
        setCurrentIndex(0);
        const fetchImages = await CharacterApi.GetImagesAsync(
          token?.access_token!,
          url,
          user?.characterId!
        );
        if (!fetchImages.isError) {
          setImages(fetchImages.data!);
        }
      }
      setOpen(false);
    } catch (ex: any) {
      toast.error("Something went wrong");
      setOpen(false);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setPreviewURL(objectURL);
    } else {
      setPreviewURL(null);
    }
  };
  const handleCancelUpload = (): void => {
    setSelectedFile(undefined);
    setPreviewURL(null);
  };
  const handleUpload = async (): Promise<void> => {
    try {
      if (selectedFile && previewURL) {
        toast.info(`Uploading: ${selectedFile.name}`);
        const request: UploadFileRequestModel = {
          id: user?.characterId!,
          file: selectedFile,
        };
        const response = await CharacterApi.UploadFileAsync(
          token?.access_token!,
          url,
          request
        );
        if (response.isError) {
          toast.error("Image could not be uploaded");
          return;
        }
        toast.success("Image Uploaded Successfully");
        const fetchImages = await CharacterApi.GetImagesAsync(
          token?.access_token!,
          url,
          user?.characterId!
        );
        if (!fetchImages.isError) {
          setImages(fetchImages.data!);
          setCurrentIndex(0);
          setSelectedFile(undefined);
          setPreviewURL(null);
        }
      } else {
        toast.warning("No file selected.");
      }
    } catch (ex: any) {
      console.log(ex);
      toast.error("Something went wrong");
    }
  };
  if (loading) {
    return (
        <Styled.SpinnerContainer>
          <Spinner visible={true} />
        </Styled.SpinnerContainer>
    );
    }
  const Footer: FC = () => (
    <Styled.ModalFooter>
      <Button fullWidth={false} variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button fullWidth={false} variant="primary" onClick={submitDelete}>
        Confirm
      </Button>
    </Styled.ModalFooter>
  );

  return (
    <Styled.ColumnContainer>
      <Styled.Container>
        <Styled.LeftColumn>
          {images &&
            !!images?.images.length &&
            images.images.map((image, index) => (
              <Styled.ThumbnailImage
                key={index}
                src={image.url}
                alt={`Thumbnail ${index}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
        </Styled.LeftColumn>
        <Styled.CarouselContainer>
          {images && !!images?.images.length ? (
            <>
                <Styled.TrashIcon>
                  <FaTrashAlt
                    color="red"
                    size={20}
                    onClick={() =>
                      handleDelete(images.images[currentIndex].path)
                    }
                  />
                </Styled.TrashIcon>
              <Styled.CarouselImage
                src={images.images[currentIndex].url}
                alt={`Image ${currentIndex}`}
              />
              <Styled.LeftArrow
                onClick={() =>
                  setCurrentIndex((prevIndex) =>
                    prevIndex === 0 ? images?.images.length - 1 : prevIndex - 1
                  )
                }
              >
                <AiFillLeftCircle />
              </Styled.LeftArrow>
              <Styled.RightArrow
                onClick={() =>
                  setCurrentIndex((prevIndex) =>
                    prevIndex === images?.images.length - 1 ? 0 : prevIndex + 1
                  )
                }
              >
                <AiFillRightCircle />
              </Styled.RightArrow>
            </>
          ) : (
            <Typography variant="heading1" align="center">
              No Images to display
            </Typography>
          )}
        </Styled.CarouselContainer>
      </Styled.Container>
        <Styled.Footer>
          <label htmlFor="fileInput">
            {previewURL ? (
              <Styled.Image src={previewURL} alt="Selected" />
            ) : (
              <Styled.ReactIcon>
                <LuImagePlus size={70} />
              </Styled.ReactIcon>
            )}
          </label>
          <Typography variant="paragraphLarge" align="center">
            Upload Image
          </Typography>
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".png, .jpg, .jpeg"
            hidden
          />
          {selectedFile && (
            <Styled.Buttons>
              <Button
                fullWidth={false}
                onClick={handleCancelUpload}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button fullWidth={false} onClick={handleUpload}>
                Save
              </Button>
            </Styled.Buttons>
          )}
        </Styled.Footer>
        <CustomModal footer={<Footer />} open={open}>
          <Typography variant="heading1" align="center">
            Are you sure you want to delete this Image?
          </Typography>
        </CustomModal>
    </Styled.ColumnContainer>
  );
};


const ImagesSheet = RequireAuth(ImagesSheetPage);

export default ImagesSheet;