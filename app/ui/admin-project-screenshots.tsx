"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeProjectScreenshot, saveProjectScreenshots } from "../lib/actions";
import { createClient } from "../lib/supabase/client";

const maxFileSize = 50 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export default function AdminProjectScreenshots({
  projectId,
  filePaths,
}: {
  projectId: string | number;
  filePaths: string[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function handleUpload() {
    const files = Array.from(inputRef.current?.files ?? []);

    if (files.length === 0) {
      setIsError(true);
      setMessage("Choose at least one screenshot to upload.");
      return;
    }

    if (files.length > 10) {
      setIsError(true);
      setMessage("Choose no more than 10 screenshots at a time.");
      return;
    }

    const invalidFile = files.find(
      (file) => !allowedTypes.has(file.type) || file.size > maxFileSize,
    );

    if (invalidFile) {
      setIsError(true);
      setMessage(
        `${invalidFile.name} must be a JPEG, PNG, or WebP image no larger than 50 MB.`,
      );
      return;
    }

    setMessage("");
    setIsError(false);

    startTransition(async () => {
      const supabase = createClient();
      const uploadedPaths: string[] = [];

      try {
        for (const file of files) {
          const extension = allowedTypes.get(file.type);
          if (!extension) {
            throw new Error(`${file.name} is not a supported image format.`);
          }

          const originalName = file.name.replace(/\.[^.]+$/, "");
          const safeName =
            originalName
              .replace(/[^a-zA-Z0-9_-]+/g, "-")
              .replace(/^-+|-+$/g, "")
              .slice(0, 80) || "screenshot";
          const path = `project-${projectId}/${crypto.randomUUID()}-${safeName}.${extension}`;
          const { error } = await supabase.storage
            .from("screenshots")
            .upload(path, file, {
              cacheControl: "3600",
              contentType: file.type,
              upsert: false,
            });

          if (error) {
            throw new Error(`Failed to upload ${file.name}: ${error.message}`);
          }

          uploadedPaths.push(path);
        }

        const result = await saveProjectScreenshots(String(projectId), uploadedPaths);
        if (result.error) {
          throw new Error(result.error);
        }

        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setMessage("Screenshots uploaded successfully.");
        router.refresh();
      } catch (error) {
        let errorMessage =
          error instanceof Error ? error.message : "The screenshots could not be uploaded.";

        if (uploadedPaths.length > 0) {
          try {
            const { error: cleanupError } = await supabase.storage
              .from("screenshots")
              .remove(uploadedPaths);
            if (cleanupError) {
              errorMessage += ` Cleanup failed: ${cleanupError.message}`;
            }
          } catch (cleanupError) {
            errorMessage += ` Cleanup failed: ${
              cleanupError instanceof Error ? cleanupError.message : "unknown storage error"
            }`;
          }
        }

        setIsError(true);
        setMessage(errorMessage);
      }
    });
  }

  function handleRemove(path: string) {
    if (!window.confirm("Remove this screenshot from the project?")) {
      return;
    }

    setMessage("");
    setIsError(false);
    startTransition(async () => {
      try {
        const result = await removeProjectScreenshot(String(projectId), path);
        if (result.error) {
          setIsError(true);
          setMessage(result.error);
          router.refresh();
          return;
        }

        setMessage("Screenshot removed.");
        router.refresh();
      } catch (error) {
        setIsError(true);
        setMessage(
          error instanceof Error ? error.message : "The screenshot could not be removed.",
        );
      }
    });
  }

  const supabase = createClient();

  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <h3 className="text-sm font-semibold text-slate-900">Project screenshots</h3>
      <p className="mt-1 text-sm text-slate-500">
        Upload JPEG, PNG, or WebP screenshots, up to 50 MB each.
      </p>

      {filePaths.length > 0 && (
        <ul className="mt-3 space-y-2">
          {filePaths.map((path) => {
            const imageUrl = supabase.storage.from("screenshots").getPublicUrl(path).data.publicUrl;
            const fileName = path.split("/").pop() ?? path;
            const displayName = fileName.replace(/^[0-9a-f-]{36}-/i, "");

            return (
              <li key={path} className="flex items-center justify-between gap-4 text-sm">
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-blue-700 underline underline-offset-2 hover:text-blue-900"
                >
                  {displayName}
                </a>
                <button
                  type="button"
                  onClick={() => handleRemove(path)}
                  disabled={isPending}
                  className="shrink-0 rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 space-y-3">
        <label htmlFor="project-screenshots" className="block text-sm font-medium text-slate-700">
          Add screenshots
        </label>
        <input
          ref={inputRef}
          id="project-screenshots"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={isPending}
          className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-60"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Uploading..." : "Upload screenshots"}
        </button>
      </div>

      {message && (
        <p role={isError ? "alert" : "status"} className="mt-3 text-sm text-slate-700">
          {message}
        </p>
      )}
    </div>
  );
}
