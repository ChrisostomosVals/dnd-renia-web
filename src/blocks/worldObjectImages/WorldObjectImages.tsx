import { FC, useEffect, useRef, useState } from "react";
import { ImagesUriModel } from "../../dist/models/ImagesUriModel";
import WorldObjectApi from "../../dist/api/WorldObjectApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import Typography from "../../components/Typography/Typography";
import * as Styled from './WorldObjectImages.styles';
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import { Spinner } from "../../components/Spinner/Spinner";
import { LuImagePlus } from "react-icons/lu";
import { Button } from "../../components/Button/Button";
import UploadFileRequestModel from "../../dist/models/UploadFileRequestModel";
import DeleteImagesRequestModel from "../../dist/models/DeleteImagesRequestModel";
export const WorldObjectImages: FC<{ id?: string }> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<ImagesUriModel>();
  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const token = useSelector((state: RootState) => state.account.token);
  const url = useSelector((state: RootState) => state.settings.url);
  const [selectedFile, setSelectedFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    if (id && token) {
      WorldObjectApi.GetImagesAsync(
        token?.access_token,
        url,
        id
      ).then((response) => {
        if (!response.isError) {
          setImages(response.data!);
        }
        setLoading(false);
      }).catch(error => {
        console.log(error)
        setLoading(false);
        toast.error('Something went wrong');
      });
    }
    else{
      setLoading(false);
    }
    
  }, [id, token, url]);
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
  useEffect(() => {
    if (images?.images.length) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [images])
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
  const handleUpload = async (): Promise<void> => {
    try {
      if (selectedFile && previewURL) {
        toast.info(`Uploading: ${selectedFile.name}`);
        const request: UploadFileRequestModel = {
          id: id!,
          file: selectedFile,
        };
        const response = await WorldObjectApi.UploadFileAsync(
          token?.access_token!,
          url,
          request
        );
        if (response.isError) {
          toast.error("Image could not be uploaded");
          return;
        }
        toast.success("Image Uploaded Successfully");
        const fetchImages = await WorldObjectApi.GetImagesAsync(
          token?.access_token!,
          url,
          id!
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
  const requestDelete = (url: string) => {
    setDeleteImages(prev => {
      if (prev.includes(url)) {
        return prev;
      } else {
        return [...prev, url];
      }
    });
  }
  const handleDelete = async():Promise<void> => {
    try{
      setLoading(true);
      const request: DeleteImagesRequestModel = {
        id: id!,
        paths: deleteImages
      }
      setCurrentIndex(0);
      const response = await WorldObjectApi.DeleteImagesAsync(token?.access_token ?? '', url, request);
      if(response.isError){
        console.log(response.error);
        toast.error('Failed to delete images');
      }
      else{
        toast.success('Images deleted');
        const updatedImages = images?.images.filter(img => !response.data!.paths.includes(img.path));
        if (updatedImages) {
          setImages(prevImages => ({
            ...prevImages!,
            images: updatedImages
          }));
        }
      }
      setLoading(false);
    }
    catch(ex: any){
      console.log(ex);
      toast.error('Something went wrong');
      setLoading(false);
    }
  }
  const handleCancelDelete = ():void =>{
    setDeleteImages([]);
  }
  if (loading) {
    return (
        <Styled.SpinnerContainer>
          <Spinner visible={true} />
        </Styled.SpinnerContainer>
    );
  }
  return(
      <>
      {images && !!images?.images.length ? (
        <Styled.CarouselContainer>
          <Styled.TrashIcon>
            <FaTrashAlt color="red" onClick={() => requestDelete(images.images[currentIndex].path) } size={20} />
          </Styled.TrashIcon>
          <Styled.CarouselImage
            src={images.images[currentIndex].url}
            alt={`Image ${currentIndex}`}
            style={{opacity: !!deleteImages.length ? (deleteImages.includes(images.images[currentIndex].path) ? 0.3 : 1) : 1}}
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
        </Styled.CarouselContainer>
      ) : (
        <Typography variant="heading1" align="center">
          No Images to display
        </Typography>
      )}
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
          {selectedFile ? (
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
          ) : 
          !!deleteImages.length && 
          <Styled.Buttons>
            <Button
                fullWidth={false}
                onClick={handleCancelDelete}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button fullWidth={false} onClick={handleDelete}>
                Delete
              </Button>
          </Styled.Buttons>
          }
        </Styled.Footer>
    </>
  )
};
