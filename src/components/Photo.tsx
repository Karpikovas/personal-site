import { withBasePath } from "@/constants/basePath";

export const Photo = () => {

  return (
    <div style={{
      minHeight: '150px',
      height: '65vh',
      backgroundImage: `url(${withBasePath("/cover-new.jpg")})`,
      backgroundAttachment: 'scroll',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '45% 55%',
      position: 'relative'
    }}>
     
    </div>
  )
}
