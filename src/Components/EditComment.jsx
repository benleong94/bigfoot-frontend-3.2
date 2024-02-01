import { useState } from "react"

export default function EditComment({ comment, onClose, onSave }) {
  const [content, setContent] = useState(comment.content);

  return <div>EditComment</div>;
}
