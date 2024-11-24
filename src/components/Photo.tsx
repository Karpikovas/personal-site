// import Image from "next/image"

export const Photo = () => {
  return (
    <div style={{
      minHeight: '150px',
      height: '45vh',
      backgroundImage: 'url(/personal-site/cover.jpg)',
      backgroundAttachment: 'scroll',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '45% 55%'
    }}>
    </div>
  )
}