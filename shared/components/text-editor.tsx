import { Level } from '@tiptap/extension-heading'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import React from 'react'
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
} from 'react-icons/fa'

export function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return <></>
  }

  return (
    <div className="flex gap-1 items-center mb-2">
      <select
        className="border border-surface-border p-2 rounded bg-surface-overlay min-w-[50px]"
        onChange={(event) => {
          console.log(event.target.value)
          editor
            ?.chain()
            .focus()
            .setHeading({ level: parseInt(event.target.value, 10) as Level })
            .run()
        }}
      >
        <option value={1}>Título</option>
        <option value={2}>Subtítulo</option>
        <option value={3}>Intertítulo</option>
      </select>
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay"
      >
        <FaBold />
      </button>

      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay "
      >
        <FaItalic />
      </button>

      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay "
      >
        <FaListUl />
      </button>

      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay "
      >
        <FaListOl />
      </button>

      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay "
      >
        <FaQuoteLeft />
      </button>
    </div>
  )
}

export default function TextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: null,
    editorProps: {
      attributes: {
        class: 'focus-visible:outline-none h-[400px] overflow-auto',
      },
    },
  })

  return (
    <>
      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="rounded p-3 border border-surface-border"
      />

      <div>
        <pre>{editor?.getHTML()}</pre>
      </div>
    </>
  )
}
