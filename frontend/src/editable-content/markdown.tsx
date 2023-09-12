import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type MarkdownProps = {
  editMode: boolean
  value: string | undefined
  onValueChange: (value: string | undefined) => void
}

export const Markdown = ({ editMode, value, onValueChange }: MarkdownProps) => {
  if (!editMode) {
    return value ? <ReactMarkdown>{value}</ReactMarkdown> : null
  }

  return <MDEditor height={600} value={value} onChange={onValueChange} />
}
