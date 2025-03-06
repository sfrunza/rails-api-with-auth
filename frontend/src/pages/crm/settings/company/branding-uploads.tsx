import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useGetSettingsQuery,
  useUpdateLogoMutation,
} from "@/services/settings-api";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CompanyForm() {
  const { data } = useGetSettingsQuery();
  const [updateLogo, { isLoading: isUpdating }] = useUpdateLogoMutation();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const companyLogo = data?.company_logo;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    if (logoFile) {
      formData.append("setting[company_logo]", logoFile);
    }

    const newData = await updateLogo({ data: formData }).unwrap();

    if (newData) {
      toast.success("Changes saved");
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleCancel = () => {
    setLogoFile(null);
    setPreviewUrl(null);
    setIsDragging(false);
    // Reset the file input value
    const fileInput = document.getElementById(
      "logo-upload",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div
          className={cn(
            "relative flex h-28 w-40 cursor-pointer flex-col items-center justify-center rounded-lg transition-colors",
            "border-2 border-dashed border-gray-300 dark:border-gray-700",
            "hover:bg-gray-50 dark:hover:bg-gray-800/50",
            isDragging && "border-primary bg-gray-50 dark:bg-gray-800/50",
            (previewUrl || companyLogo) && "h-28 w-40",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("logo-upload")?.click()}
        >
          {previewUrl || companyLogo ? (
            <img
              src={previewUrl || companyLogo}
              alt="Company logo"
              className="h-full w-full rounded-lg object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-primary">
                  Click to upload
                </span>{" "}
                or drag and drop
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (max. 2MB)
              </p>
            </div>
          )}
        </div>
        <Input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="border-t pt-4">
        <div
          className={cn("flex transition-opacity duration-500 sm:justify-end", {
            "invisible opacity-0": !previewUrl,
            "visible opacity-100": previewUrl,
          })}
        >
          <div className="flex min-h-9 w-full gap-4 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              className="w-full sm:w-auto"
              disabled={isUpdating}
              loading={isUpdating}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </div>
    </form>
  );
}
