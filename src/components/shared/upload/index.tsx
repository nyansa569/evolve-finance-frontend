import { useEffect, useMemo, useState } from "react";
import { FileWithPath, useDropzone, type Accept } from "react-dropzone";

import { toast } from "sonner";
import { CloudArrowUp } from "@phosphor-icons/react";

import { cn } from "@/utils";
import { MAX_FILE_SIZE } from "@/components/constants";
import { useUploadFileMutation } from "@/services/global";

import { Button } from "@/components/ui/button";

import Typography from "../typography";
import UploadItems from "./components/upload-items";
import { ApiResponse } from "@/types";
import { getAuthenticatedUser } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/hook";
import uploadImg from "../../../assets/images/upload.svg";

export interface DomesticFile {
  file: FileWithPath;
  uploadedUrl?: string;
  isUploaded: boolean;
}

type Props = {
  /**
   * Callback function that is called when the upload is complete.
   * @param url - The URL of the uploaded file.
   * @returns {void}
   * @example
   * onUploadComplete={(url) => {
   *  console.log(url);
   * }}
   */
  onUploadComplete?: (urls: string[]) => void;

  /**
   * Callback function that is called when the file is changed.
   * @param {File} file - The selected file.
   * @returns {void}
   */
  onFilesChange?: (file: File[] | null) => void;

  /**
   * Specifies whether the upload should be automatically triggered.
   * @default true
   */
  automaticUpload?: boolean;

  /**
   * Specifies the accepted file types for the upload component.
   * @default {}
   * @example
   * accept={{"image/*": [".png", ".jpeg", ".jpg", ".webp"],}}
   * accept={{"application/pdf": [".pdf"]}}
   */
  accept?: Accept;

  /**
   * Default links to the uploaded assets
   * @default []
   * @example
   * defaultValue=["https://storage.rancard.com/file/cdn/sdsds.png"]
   */
  defaultValue?: string[];

  /**
   * Specifies if multiple files can be selected
   * @default true
   * @example
   * multiple={true}
   * multiple={false}
   */
  multiple?: boolean;

  /**
   * Specifies the maximum number of files that can be selected
   * @default 5
   * @example
   * maxFile={10}
   * maxFile={5}
   */
  maxFiles?: number;

  /**
   *  Specifies addition class names for the container
   */
  className?: string;
};

/**
 * Renders a simple upload component.
 *
 * @param props - The component props.
 * @param props.onUploadComplete - Callback function that is called when the upload is complete.
 * @param props.onFileChange - Callback function that is called when the file is changed.
 * @param props.automaticUpload - Specifies whether the upload should be automatically triggered.
 * @param props.accept - Specifies the accepted file types for the upload component.
 * @param props.showPreview - Specifies whether to show the preview or not.
 * @param props.defaultValue - Default links to the uploaded assets
 * @param props.multiple - Specifies if multiple files can be selected
 * @param props.maxFile - Specifies the maximum number of files that can be selected
 * @param props.className - Specifies addition class names for the container
 * @returns {JSX.Element} - The component JSX.Element
 */
export default function Dropzone({
  defaultValue = [],
  automaticUpload = false,
  multiple = false,
  accept = {
    "image/*": [".png", ".jpeg", ".jpg", ".webp"],
  },
  maxFiles = 1,
  className,

  onUploadComplete,
  onFilesChange,
}: Readonly<Props>) {
  const [_uploadedUrls, setUploadedUrls] = useState<string[]>(defaultValue);
  const [selectedFiles, setSelectedFiles] = useState<DomesticFile[]>([]);

  const { isAuthenticated } = useAppSelector(getAuthenticatedUser);

  const [uploadFiles, { isLoading: isUploadingFiles }] =
    useUploadFileMutation();

  const {
    getRootProps,
    getInputProps,
    open,
    fileRejections: _, // use the file rejections later for something to show the user
    acceptedFiles,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple,
    maxFiles,
    accept,
    maxSize: MAX_FILE_SIZE,
    validator: (file) => {
      if (file.size > MAX_FILE_SIZE) {
        return {
          code: "file-too-large",
          message: "File is too large",
        };
      }
      return null;
    },
  });

  const filesUploaded = useMemo(
    () => selectedFiles.every((file) => file.isUploaded),
    [selectedFiles],
  );

  function handlePostUpload(data: ApiResponse<string>, file: File) {
    const url = data.data;

    onUploadComplete?.([url]);
    setUploadedUrls((prev) => [...prev, url]);

    const updatedFiles = selectedFiles.map((selectedFile) => {
      if (selectedFile.file.name === file.name) {
        return {
          ...selectedFile,
          isUploaded: true,
        };
      }
      return selectedFile;
    });

    setSelectedFiles(updatedFiles);
  }

  async function handleFileUpload(file: File) {
    const res = await uploadFiles(file);

    if ("error" in res) {
      console.error(res.error);
      throw new Error("An error occurred while uploading the file");
    }

    handlePostUpload(res.data, file);

    return res.data;
  }

  // Allow backend to handle multiple file uploads
  // the come and refactor this to handle multiple file uploads at once
  // and remove the for loop
  function handleFileUploads() {
    if (!isAuthenticated) {
      toast.error("User is not unauthenticated", {
        description: "Please login to upload files",
      });

      return;
    }

    selectedFiles.forEach(({ file }) => {
      toast.promise(handleFileUpload(file), {
        loading: "Uploading file...",
        success: "File uploaded successfully",
        error: (err) =>
          err?.message ?? "An error occurred while uploading the file",
      });
    });
  }

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const unUploadedFiles = acceptedFiles.map((file) => {
        return {
          file,
          isUploaded: false,
        };
      });

      const files = selectedFiles.concat(unUploadedFiles);

      setSelectedFiles(files);
      onFilesChange?.(files.map(({ file }) => file));

      if (automaticUpload) {
        handleFileUploads();
      }
    }
  }, [acceptedFiles]);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 bg-secondary-400 dark:bg-neutral-900 rounded-xl min-w-96 max-w-full",
        className,
      )}
    >
      {/* dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          " px-5 pt-5 pb-10 flex items-center justify-center bg-[#0F4354] dark:border-neutral-600 rounded-xl",
          isDragReject && "border-red-500 bg-red-100 dark:bg-red-900",
          isDragAccept && "border-green-500 bg-green-100 dark:bg-green-900",
          isDragActive && "border-primary-200 bg-purple-100 dark:bg-purple-900",
        )}
      >
        <input {...getInputProps()} />

        <div className="w-full flex flex-col items-start justify-around p- min-h-60">
          <Typography className="pb-12 text-accent-50">Upload products</Typography>

          <div className="w-32 h-fit mx-auto bg-[#0F4354] flex flex-col items-center justify-center rounded-full dark:bg-neutral-800">
            <img 
              src={uploadImg}
              alt="Upload image"
              className="w-full h-full "
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-4">
            {/* <div className="flex flex-col items-center">
              <Typography typo="body-small-semibold" className="text-accent-50">
                Drag and drop your files {automaticUpload ? "upload" : "here"}
              </Typography>
            </div> */}

            <Button onClick={open}
              variant="ghost"
              className="w-fit mx-auto pt-4 text-accent-50 text-center"
            >
              {/* Choose {multiple ? "files" : "file"} */}
              Drag & drop files here
            </Button>
          </div>
        </div>
      </div>

      {/* selected files section */}
      <div className="flex flex-col gap-2 overflow-scroll max-h-32 bg-[#0F4354]">
        {selectedFiles.map((file, i) => (
          <UploadItems file={file} key={"uploads_" + i} />
        ))}
      </div>

      {/* Call to actions */}
      <div className="flex items-center justify-between ">
        <Button className="hidden" variant="ghost">
          Cancel
        </Button>
        <Button
          className="w-full bg-[#0F4354] hover:bg-[#0F4354] text-accent-50"
          isLoading={isUploadingFiles}
          onClick={handleFileUploads}
          disabled={selectedFiles.length <= 0 || filesUploaded}
        >
          Upload files
        </Button>
      </div>
    </div>
  );
}
