import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface layoutProps {
  message: string;
  colorType: 'white' | 'black';
  withDropDown?: boolean;
  isLanding: boolean;
  active?: roleType;
}

const Layout: React.FC<layoutProps> = ({
  message,
  children,
  colorType,
  withDropDown = false,
  active,
  isLanding,
}) => {
  const [navbar, setNavbar] = useState(false);

  //navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY >= 5) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener('scroll', changeBackground);
  });
  return (
    <>
      <div
        className={`hidden sm:block fixed w-full z-20 pb-4 ${
          isLanding && navbar ? 'bg-sea' : ''
        } ${
          !isLanding
            ? colorType == 'white'
              ? 'bg-blue-astronaut'
              : 'bg-white'
            : ''
        }`}
      >
        <nav
          className={`flex justify-between items-center w-5/6 h-28 mx-auto border-b-4 ${
            colorType == 'white' ? 'border-white' : 'border-black'
          }`}
        >
          <div className="flex h-full items-center content-center">
            <img
              src={`/nav/${colorType}-left.png`}
              className="h-12 mr-3"
              alt=""
            />
            <img src={`/nav/${colorType}-mid.png`} className="h-12" alt="" />
            <img src={`/nav/${colorType}-right.png`} alt="" />
          </div>
          {!withDropDown ? (
            <div
              className={`text-${colorType} flex h-full items-center text-xl sm:text-2xl`}
            >
              <h2> {message}</h2>
            </div>
          ) : (
            <DropDown active={active} />
          )}
        </nav>
      </div>
      <div className="sm:hidden bg-white fixed w-full pb-2 z-20">
        <nav
          className={`flex items-center justify-between w-5/6 h-20 mx-auto border-b-2 border-blue-900`}
        >
          <div className="flex h-full items-center content-center">
            <img src={`/nav/blue-left.png`} className="h-8 mr-3" alt="" />
            <img src={`/nav/blue-mid.png`} className="h-8 mr-3" alt="" />
            <img src={`/nav/blue-right.png`} className="h-8" alt="" />
          </div>
          {!withDropDown ? (
            <div style={{ color: '#285976' }} className={`text-xl sm:text-2xl`}>
              <h2 className="text-right"> {message}</h2>
            </div>
          ) : (
            <DropDown active={active} />
          )}
        </nav>
      </div>
      {/* main body */}
      <div className="relative">{children}</div>
      {/* footer */}
      <footer
        style={{ height: '15vh' }}
        className="max-h-32 w-full flex justify-center bg-white px-10 items-center lg:px-16"
      >
        <img src="/nav/danger.png" className="w-12" alt="" />
        <h4 className="text-xs sm:text-sm lg:text-base">
          This website is used for the prototype of undergraduate thesis in
          Digital Marine Operations and Maintenance Laboratory.
        </h4>
      </footer>
    </>
  );
};

export default Layout;

export type roleType = 'project' | 'logistics' | 'purchasing';

const DropDown: React.FC<{ active: roleType }> = ({ active }) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {}, [show]);
  const data = ['project', 'logistics', 'purchasing'];
  const slug = ['project', 'material-logistics', 'purchasing'];
  const res = data.map((e, i) => {
    if (e == active) return <div key={'dropdown-' + i}></div>;
    return (
      <Link key={'dropdown-' + i} href={'/role/' + slug[i]}>
        <div
          style={{ borderTop: '2px solid white' }}
          className="text-white capitalize sm:text-xl pl-4 sm:pl-0 sm:pr-4 md:pr-5 md:text-2xl py-1.5"
        >
          {e}
        </div>
      </Link>
    );
  });
  return (
    <div
      onClick={() => setShow(!show)}
      style={{ backgroundColor: '#C4C4C4' }}
      className="relative w-32 h-12 sm:h-14 sm:w-52 rounded-lg flex cursor-pointer"
    >
      <div
        style={{ backgroundColor: '#C4C4C4' }}
        className={`absolute hidden sm:block  w-full z-30 left-0 top-10 sm:top-12 pt-2 rounded-b-lg text-right transform ease-in-out duration-500 ${
          show
            ? ' max-h-40 scale-y-100 -translate-y-0 opacity-100'
            : ' max-h-0 scale-y-0 -translate-y-1/4 opacity-0'
        }`}
      >
        {res}
      </div>
      <div
        className={`absolute w-full bg-blue-venice sm:hidden z-30 left-0 top-10 sm:top-12 pt-2 rounded-b-lg text-left transform ease-in-out duration-500 ${
          show
            ? ' max-h-40 scale-y-100 -translate-y-0 opacity-100'
            : ' max-h-0 scale-y-0 -translate-y-1/4 opacity-0'
        }`}
      >
        {res}
      </div>
      <div
        style={{ backgroundColor: '#D0D0D0' }}
        className="hidden relative z-40 rounded-l-lg sm:flex h-12 w-9 sm:h-14 sm:w-12 justify-center items-center"
      >
        <img src="/nav/orang.png" alt="" />
      </div>
      <div className="hidden relative z-40 sm:flex justify-evenly  items-center w-32 sm:w-40 h-full">
        <h4 className="text-white capitalize sm:text-xl md:text-2xl">
          {active}
        </h4>
        <img
          src="/nav/triangle-white.png"
          className="w-3 h-3 md:w-5 md:h-5"
          alt=""
        />
      </div>
      <div className="flex sm:hidden z-40 justify-evenly rounded-lg items-center w-32 sm:w-40 h-full bg-blue-venice">
        <h4 className="text-white capitalize sm:text-xl md:text-2xl">
          {active}
        </h4>
        <img
          src="/nav/triangle-white.png"
          className="w-3 h-3 md:w-5 md:h-5"
          alt=""
        />
      </div>
    </div>
  );
};
