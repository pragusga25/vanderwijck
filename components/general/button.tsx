import React from 'react';

interface ButtonProps{
    customClassName: string ,
    colorScheme:"blue-astronaut"|"hint-of-red" | "blue-venice" | "astronaut"|"nevada"|"mine-shaft" |"white",
    onClick?: ()=> void
}


const Button: React.FC<ButtonProps> = ({
  customClassName,
  colorScheme,
  children,
  onClick
}) => {
  return (
    <div
      onClick={()=> onClick && onClick()}
      style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
      className={`bg-${colorScheme} cursor-pointer transform hover:-translate-y-0.5 hover:scale-105 ease-in-out duration-200 flex justify-center content-center rounded-md ${customClassName}`}
    >
      {children}
      <Bg/>
    </div>
  );
};
export const BackButton: React.FC<{message?: string, onClick: ()=>void, customClassName?: string}> = ({message = "" , onClick, customClassName="px-10 py-3 text-black "})=>{
    return <Button colorScheme="white" onClick={onClick} customClassName={customClassName}>
        <h4> &lt; {message}</h4>
    </Button>
}
export default Button;

export const Bg = ()=>{
    return <div>
        <div className="hidden bg-blue-venice"></div>
        <div className="hidden bg-blue-astronaut"></div>
        <div className="hidden bg-astronaut"></div>
        <div className="hidden bg-nevada"></div>
        <div className="hidden bg-mine-shaft"></div>
        <div className="hidden bg-hint-of-red"></div>
    </div>
}