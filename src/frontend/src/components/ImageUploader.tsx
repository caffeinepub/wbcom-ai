import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HttpAgent } from "@icp-sdk/core/agent";
import { Camera, ImageIcon, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";

export interface UploadedImage {
  name: string;
  url: string;
  previewUrl: string;
}

interface ImageUploaderProps {
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

export function ImageUploader({
  onImagesChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<
    Array<{
      name: string;
      previewUrl: string;
      uploading: boolean;
      progress: number;
      url?: string;
    }>
  >([]);

  async function uploadImageToStorage(file: File): Promise<string> {
    const config = await loadConfig();
    const agent = new HttpAgent({ host: config.backend_host });
    const storageClient = new StorageClient(
      config.bucket_name,
      config.storage_gateway_url,
      config.backend_canister_id,
      config.project_id,
      agent,
    );
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { hash } = await storageClient.putFile(bytes, () => {});
    return storageClient.getDirectURL(hash);
  }

  async function handleFilesSelected(files: FileList | null) {
    if (!files || files.length === 0) return;

    const currentCount = previews.filter((p) => p.url).length;
    const available = maxImages - currentCount;
    if (available <= 0) {
      toast.error(`সর্বোচ্চ ${maxImages}টি ছবি যোগ করা যাবে`);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, available);

    // Add placeholder previews immediately
    const newPreviews = filesToProcess.map((file) => ({
      name: file.name,
      previewUrl: URL.createObjectURL(file),
      uploading: true,
      progress: 0,
    }));

    setPreviews((prev) => {
      const next = [...prev, ...newPreviews];
      return next;
    });

    // Upload each image
    const uploadedImages: UploadedImage[] = [];
    const uploadPromises = filesToProcess.map(async (file, i) => {
      const previewUrl = newPreviews[i].previewUrl;
      try {
        const url = await uploadImageToStorage(file);
        setPreviews((prev) =>
          prev.map((p) =>
            p.previewUrl === previewUrl
              ? { ...p, uploading: false, progress: 100, url }
              : p,
          ),
        );
        uploadedImages.push({ name: file.name, url, previewUrl });
      } catch {
        toast.error(`${file.name} upload ব্যর্থ হয়েছে`);
        setPreviews((prev) => prev.filter((p) => p.previewUrl !== previewUrl));
      }
    });

    await Promise.all(uploadPromises);

    // Notify parent with all successfully uploaded images
    setPreviews((current) => {
      const uploaded = current
        .filter((p) => p.url)
        .map((p) => ({ name: p.name, url: p.url!, previewUrl: p.previewUrl }));
      onImagesChange(uploaded);
      return current;
    });
  }

  function removeImage(previewUrl: string) {
    setPreviews((prev) => {
      const next = prev.filter((p) => p.previewUrl !== previewUrl);
      const uploaded = next
        .filter((p) => p.url)
        .map((p) => ({ name: p.name, url: p.url!, previewUrl: p.previewUrl }));
      onImagesChange(uploaded);
      return next;
    });
  }

  const hasSpace = previews.length < maxImages;

  return (
    <div className="space-y-3">
      {/* Upload Button */}
      {hasSpace && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
            data-ocid="image_uploader.upload_button"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-dashed border-navy/30 text-navy/70 hover:bg-navy/5 hover:text-navy text-xs"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-3.5 h-3.5 mr-1.5" />📷 ছবি যোগ করুন / Attach
            Photos
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            সর্বোচ্চ {maxImages}টি ছবি (JPG, PNG, GIF)
          </p>
        </div>
      )}

      {/* Previews */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {previews.map((p) => (
            <div
              key={p.previewUrl}
              className="relative w-20 h-20 rounded-lg overflow-hidden border border-navy/20 bg-navy/5"
            >
              <img
                src={p.previewUrl}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              {p.uploading ? (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                  <Progress value={p.progress} className="w-14 h-1" />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => removeImage(p.previewUrl)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
              {p.url && (
                <div className="absolute bottom-1 left-1 w-3 h-3 bg-green-500 rounded-full border border-white" />
              )}
            </div>
          ))}
          {!hasSpace && (
            <div className="w-20 h-20 rounded-lg border border-dashed border-navy/20 flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="w-4 h-4 text-muted-foreground mx-auto mb-0.5" />
                <p className="text-[10px] text-muted-foreground">সর্বোচ্চ</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Utility: parse [IMAGES:url1,url2,...] from message text
export function parseImagesFromMessage(message: string): {
  text: string;
  imageUrls: string[];
} {
  const match = message.match(/\[IMAGES:([^\]]+)\]/);
  if (!match) return { text: message, imageUrls: [] };
  const imageUrls = match[1]
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
  const text = message.replace(/\[IMAGES:[^\]]+\]/, "").trim();
  return { text, imageUrls };
}

// Utility: format images into append string
export function formatImagesAppend(imageUrls: string[]): string {
  if (imageUrls.length === 0) return "";
  return ` [IMAGES:${imageUrls.join(",")}]`;
}

// Component: show images inline in message displays
interface MessageImagesProps {
  imageUrls: string[];
  onImageClick?: (url: string) => void;
}

export function MessageImages({ imageUrls, onImageClick }: MessageImagesProps) {
  if (imageUrls.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {imageUrls.map((url, i) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: image url list is stable display order
          key={i}
          type="button"
          className="w-16 h-16 rounded-lg overflow-hidden border border-navy/20 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-navy/40"
          onClick={() => onImageClick?.(url)}
          title="ছবি দেখুন / View image"
        >
          <img
            src={url}
            alt={`Attachment ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
