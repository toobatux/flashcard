"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

interface TipTapProps {
  onChange: (content: JSONContent) => void;
}

const Tiptap = ({ onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ListItem,
      Image,
      Text,
      TextStyle,
      Paragraph,
      Color,
      Heading.configure({
        HTMLAttributes: {
          //class: "font-bold capitalize",
          levels: [2, 3],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-2",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-2",
        },
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "shadow appearance-none min-h-[150px] max-h-[400px] overflow-auto border rounded w-full border-white/15 bg-white/5 py-1.5 px-2 text-white text-sm leading-tight focus:outline-none focus:shadow-outline",
      },
    },
    content: "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col justify-stretch min-h-[150px] rounded border-b-0">
        <div className="flex items-center border-2 border-white/5 rounded-lg mb-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`w-[42px] h-[42px] p-2 rounded hover:bg-white/5 ${
              editor.isActive("bold") ? "bg-white/10" : ""
            }`}
            title="Bold (Ctrl+B)"
          >
            <b>B</b>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`w-[42px] h-[42px] p-2 rounded hover:bg-white/5 ${
              editor.isActive("italic") ? "bg-white/10" : ""
            }`}
            title="Italic (Ctrl+I)"
          >
            <i>I</i>
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`w-[42px] h-[42px] p-2 rounded hover:bg-white/5 
              ${editor.isActive("heading", { level: 2 }) ? "bg-white/10" : ""}
            `}
          >
            H2
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`w-[42px] h-[42px] p-2 rounded hover:bg-white/5 
              ${editor.isActive("heading", { level: 3 }) ? "bg-white/10" : ""}
            `}
          >
            H3
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`w-[42px] h-[42px] p-2 rounded hover:bg-white/5 ${
              editor.isActive("bulletList") ? "bg-white/10" : ""
            }`}
            title="Bullet List"
          >
            <FormatListBulletedIcon />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`w-[42px] h-[42px] p-2 rounded hover:bg-white/5 ${
              editor.isActive("orderedList") ? "bg-white/10" : ""
            }`}
            title="Ordered List"
          >
            <FormatListNumberedIcon />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setColor("#6366f1").run()}
            className={`w-[42px] h-[42px] p-2 rounded hover:bg-white/5 flex items-center justify-center
              ${
                editor.isActive("textStyle", { color: "#818cf8" })
                  ? "bg-white/10"
                  : ""
              }
            `}
          >
            <div className="w-4 h-4 rounded bg-indigo-400"></div>
          </button>

          <button
            onClick={() => editor.chain().focus().unsetColor().run()}
            data-testid="unsetColor"
          >
            Unset color
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Tiptap;
