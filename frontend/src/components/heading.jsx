function Heading({title, theme}) {
  return (
    <h2 className={`heading ${ theme ? 'heading_theme_' + theme : '' }`}>{title}</h2>
  )
}

export default Heading;
