import ModeSwitch from './ModeSwitch'
import DropDown from './DropDown'
const Navbar = ({handleMode}) => {
  return (
    <>
    <div className="container mx-auto">
  <nav className='w-100 flex justify-between mx-10 mt-10'>
    <div className=''>
        <img src="/assets/logo.png" alt="" width={'70px'}/>
    </div>
    {/*  */}
    <div className='w-100 flex space-x-4'>
            {/* <ModeSwitch mode={handleMode}/> */}
        {/* <div>tranlate</div> */}
        <DropDown/>
    </div>

    </nav>
  </div>
      
    </>
  )
}

export default Navbar
