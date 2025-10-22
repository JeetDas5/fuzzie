/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as LR from "@uploadcare/blocks";
import "@uploadcare/react-uploader/core.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  onUpload?: any;
};

function UploadCareButton({ onUpload }: Props) {
  LR.registerBlocks(LR);

  const router = useRouter();
  const ctxProviderRef = useRef<HTMLElement & { addEventListener: (type: string, handler: (e: any) => void) => void }>(null);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };
    ctxProviderRef.current?.addEventListener(
      "file-upload-success",
      handleUpload
    );
  }, [onUpload, router]);
  return (
    <div>
      {/* @ts-expect-error - Uploadcare custom element */}
      <lr-config ctx-name="my-uploader" pubkey="a9428ff5ff90ae7a64eb" />

      {/* @ts-expect-error - Uploadcare custom element */}
      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
      />

      {/* @ts-expect-error - Uploadcare custom element */}
      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
}

export default UploadCareButton;
