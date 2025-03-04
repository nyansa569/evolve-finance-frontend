import { useMemo } from "react";
import { CheckCircle } from "@phosphor-icons/react";

import { cn, formatBytes } from "@/utils";
import { getFileUploadProgress } from "@/redux/slices/globalSlice";

import { Progress } from "@/components/ui/progress";

import { DomesticFile } from "..";
import Typography from "../../typography";
import { useAppSelector } from "@/hook";

interface Props {
  file: DomesticFile;
  onRemove?: (file: DomesticFile) => void;
}

export default function UploadItems({ file }: Readonly<Props>) {
  const progress = useAppSelector((state) =>
    getFileUploadProgress(state, file.file.name),
  );

  const { name, size, url } = useMemo(() => {
    const { file: selectedFile } = file;

    return {
      name: selectedFile.name,
      size: formatBytes(selectedFile.size),
      url: URL.createObjectURL(selectedFile),
    };
  }, [file]);

  return (
    <div
      className={cn(
        "flex items-center bg-[#0F4354] text-accent-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-600 rounded-xl p-2 gap-2",
        file.isUploaded && "bg-green-100 dark:bg-green-900",
      )}
    >
      <div className="h-16 flex items-center justify-center min-w-24 max-w-24 rounded-lg gap-2 overflow-hidden">
        <img alt={name} src={url} className="w-full object-cover" />
      </div>
      <div className="flex flex-[1] max-w-32 flex-col gap-3 justify-between">
        <Typography
          typo="body-small-semibold"
          className="text-ellipsis overflow-hidden line-clamp-2 max-w-24"
        >
          {name}
        </Typography>
        <Progress value={progress} />
      </div>

      <div className="flex flex-col gap-3 flex-[0.4] items-end justify-between">
        <Typography typo="body-small-semibold" className="text-gray-400">
          {size}
        </Typography>
        {file.isUploaded ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <Typography typo="body-small-semibold">{progress}%</Typography>
        )}
      </div>
    </div>
  );
}
