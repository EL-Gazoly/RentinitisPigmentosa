import React from 'react'

const ImageCard = ({src, text}) => {
  return (
    <div>
      <div className="box cursor-pointer w-[542px] h-[409px] border border-t-4 border-x-8 border-border rounded-[58px]
        flex flex-col justify-between items-center z-20
        ">
            <div className=' w-[533px] h-full  z-0'>
                <div className=' aspect-auto'>
                    <img src={src} className=' rounded-t-[58px] rounded-b-xl' alt="sample" />
                </div>
            </div>
            <div className=" w-full h-[67px] bg-seeThroughBorder rounded-t-none rounded-b-[58px] flex justify-center items-center
                font-nunito font-bold text-2xl 
            ">
                {text} Image
            </div>

        </div>
    </div>
  )
}

export default ImageCard
