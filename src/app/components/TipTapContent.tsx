// utils/renderTiptapContent.ts
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

export function renderTiptapContent(content: any) {
  return generateHTML(content, [StarterKit, TextStyle, Color]);
}
