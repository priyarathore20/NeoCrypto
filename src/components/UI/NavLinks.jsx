const AnimatedNavLink = ({
  as: Component = 'a',
  className = '',
  color = '#15B8A6',
  speed = '2s',
  children,
  ...rest
}) => {
  return (
    <Component
      href={rest.href}
      className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}
      {...rest}
    >
      <div
        className="right-[-250%] bottom-[-11px] z-0 absolute opacity-70 rounded-full w-[300%] h-1/2 animate-star-movement-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 100%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="top-[-10px] left-[-250%] z-0 absolute opacity-70 rounded-full w-[300%] h-[50%] animate-star-movement-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 100%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="relative z-1 border-gray-800 bg-gradient-to-b from-black to-gray-900 px-5 py-3 border rounded-2xl text-center text-white">
        {children}
      </div>
    </Component>
  );
};

export default AnimatedNavLink;
