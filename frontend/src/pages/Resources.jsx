import React from 'react'
import Header from '../components/Header'

const Resources = () => {
  return (
    <div>
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8 overflow-scroll">
        <h1 className="text-3xl font-bold mb-8">Caregiver Resources</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">National Eye Institute</h2>
            <p className="text-gray-700">
              The National Eye Institute is a great resource for information on
              retinitis pigmentosa. Their website has information on the latest
              research, clinical trials, and treatment options.
            </p>
            <a
              href="https://www.nei.nih.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-primary hover:text-darkPrimary "
            >
              Visit the NEI website
            </a>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Foundation Fighting Blindness</h2>
            <p className="text-gray-700">
              The Foundation Fighting Blindness is a nonprofit organization
              dedicated to finding treatments and cures for retinal diseases
              like retinitis pigmentosa. Their website has information on
              research, clinical trials, and resources for caregivers.
            </p>
            <a
              href="https://www.fightingblindness.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-primary hover:text-darkPrimary"
            >
              Visit the Foundation Fighting Blindness website
            </a>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">American Council of the Blind</h2>
            <p className="text-gray-700">
              The American Council of the Blind is a national organization that
              advocates for the rights of blind and visually impaired people.
              They provide information and resources for caregivers and family
              members of those with visual impairments.
            </p>
            <a
              href="https://www.acb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-primary hover:text-darkPrimary"
            >
              Visit the American Council of the Blind website
            </a>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Low Vision Rehabilitation</h2>
            <p className="text-gray-700">
            Low vision rehabilitation can help individuals with retinitis
              pigmentosa make the most of their remaining vision. This type of
              rehabilitation involves working with a specialist who can provide
              training on how to use magnifying devices, lighting, and other
              tools to enhance visual function.
            </p>
            <a
              href="https://www.afb.org/blindness-and-low-vision/eye-conditions/retinitis-pigmentosa  "
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-primary hover:text-darkPrimary"
            >
               Learn more about low vision rehabilitation
            </a>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Rehabilitation and Training</h2>
            <p className="text-gray-700">
            Orientation and mobility (O&amp;M) training can help individuals
              with retinitis pigmentosa navigate their environment safely and
              confidently. This type of training involves learning how to use
              mobility aids, such as a cane or a guide dog, and developing
              orientation skills to help navigate unfamiliar places.
            </p>
            <a
              href="https://www.afb.org/blindness-and-low-vision/using-technology/mobility-training"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-primary hover:text-darkPrimary"
            >
              Learn more about O&amp;M training
            </a>
          </div>
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Assistive Technology</h2>
            <p className="text-gray-700">
              Assistive technology can help individuals with retinitis
              pigmentosa access information and perform daily tasks more
              independently. There are a variety of assistive technology
              devices available, such as screen readers, magnifiers, and
              voice-activated assistants, that can be tailored to an individual's
              needs.
            </p>
            <a
              href="https://www.afb.org/blindness-and-low-vision/eye-conditions/retinitis-pigmentosa"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-primary hover:text-darkPrimary"
            >
              Learn more about assistive technology
            </a>
          </div>
          <div className=' flex flex-col'>

          
          <div className='mt-8 w-screen h-fit'>
          <h2 className="text-2xl font-bold mb-4">Related Videos</h2>
          <div className=" flex flex-row gap-4 ">
            <div className="bg-white shadow-md rounded-lg flex items-center justify-center w-fit px-4">
            <iframe width="477" height="272" 
            src="https://www.youtube.com/embed/o0__ZphE3mM" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 w-fit px-4">
            <iframe width="477" height="272" src="https://www.youtube.com/embed/TwxVKeEgJtg" title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
             gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 w-fit px-4">
            <iframe width="477" height="272" src="https://www.youtube.com/embed/-iWorZ8MOvg?start=113" title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
             gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            
          </div>
            </div>
          <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
          <ul className="list-disc list-inside">
            <li className="mb-4">
              <a
                className="text-primary hover:underline"
                href="https://www.afb.org/blindness-and-low-vision/eye-conditions/retinitis-pigmentosa"
              >
                American Foundation for the Blind - Retinitis Pigmentosa
              </a>
            </li>
            <li className="mb-4">
              <a
                className="text-primary hover:underline"
                href="https://www.hopkinsmedicine.org/wilmer/conditions/retinitis-pigmentosa.html"
              >
                Johns Hopkins Medicine - Retinitis Pigmentosa
              </a>
            </li>
            <li className="mb-4">
              <a
                className="text-primary hover:underline"
                href="https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/retinitis-pigmentosa"
              >
                National Eye Institute - Retinitis Pigmentosa
              </a>
            </li>
            <li className="mb-4">
              <a
                className="text-primary hover:underline"
                href="https://www.preventblindness.org/retinitis-pigmentosa"
              >
                Prevent Blindness - Retinitis Pigmentosa
              </a>
            </li>
          </ul>

          </div>
        </div>
        </div>
        </div>
        </div>
      
    </div>
  )
}

export default Resources
