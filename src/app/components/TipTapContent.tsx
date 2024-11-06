// utils/renderTiptapContent.ts
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

export function renderTiptapContent(content: any) {
  return generateHTML(content, [StarterKit]);
}
