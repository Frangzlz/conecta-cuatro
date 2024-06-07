export const Circle = ({ children, updateBoard, value, modal, i, j }) => {
  return (
    <div className={`circle ${value || modal ? 'check' : ''}`} onClick={() => updateBoard(i, j)}>
      <span className={`circle-text ${value ? 'fall-animation' : ''}`}>{children}</span>
    </div>
  )
}
