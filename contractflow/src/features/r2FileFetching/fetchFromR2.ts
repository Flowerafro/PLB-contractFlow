import { file } from "zod";
import type { ArchiveDocument } from "@/app/types/archiveDocument";

import { useEffect } from "react";

export async function fetchFromR2(): Promise<ArchiveDocument[]> {
  try {
    const response = await fetch("/api/plb-contractflow-r2");

    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.statusText}`);
    }

    const files: ArchiveDocument[] = await response.json();
    return files;
  } catch (error: any) {
    throw new Error(error.message || "Unknown error fetching files");
  }
}

