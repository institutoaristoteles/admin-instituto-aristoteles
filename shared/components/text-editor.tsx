import LabeledInput from '@/shared/components/labeled-input'
import { Level } from '@tiptap/extension-heading'
import { Link } from '@tiptap/extension-link'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { OverlayPanel } from 'primereact/overlaypanel'
import React, { FormEvent, useCallback, useRef, useState } from 'react'
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
} from 'react-icons/fa'
import { RiLinkM, RiLinkUnlinkM } from 'react-icons/ri'

export function LinkButton({ editor }: { editor: Editor }) {
  const op = useRef<OverlayPanel>(null)
  const [url, setUrl] = useState('')

  const setLink = useCallback(
    (event: FormEvent) => {
      event.preventDefault()

      if (!url) editor.chain().focus().unsetLink().run()

      editor.chain().focus().setLink({ href: url }).run()
    },
    [editor, url],
  )

  return (
    <>
      <button
        type="button"
        onClick={(e) => op.current?.toggle(e)}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay"
      >
        <RiLinkM />
      </button>

      {editor.getAttributes('link').href && (
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="border border-surface-border p-2 rounded text-xl bg-surface-overlay"
        >
          <RiLinkUnlinkM />
        </button>
      )}

      <OverlayPanel
        ref={op}
        onHide={() => setUrl('')}
        onShow={() => setUrl(editor.getAttributes('link').href)}
      >
        <form className="flex flex-col gap-5" onSubmit={setLink}>
          <LabeledInput label="URL">
            <InputText value={url} onChange={(ev) => setUrl(ev.target.value)} />
          </LabeledInput>

          <div className="flex items-center justify-start">
            <Button label="Confirmar" />
          </div>
        </form>
      </OverlayPanel>
    </>
  )
}

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
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay"
      >
        <FaItalic />
      </button>

      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay"
      >
        <FaListUl />
      </button>

      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay"
      >
        <FaListOl />
      </button>

      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay"
      >
        <FaQuoteLeft />
      </button>

      <LinkButton editor={editor} />
    </div>
  )
}

export default function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        autolink: true,
        linkOnPaste: true,
        openOnClick: false,
      }),
    ],
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
