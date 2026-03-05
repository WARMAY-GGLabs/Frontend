const StarBorder = ({
  as: Component = 'button',
  className = '',
  innerClassName = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] cursor-pointer
        transition-all duration-300 ease-out
        hover:scale-[1.06] hover:-translate-y-1
        active:scale-[0.97] active:translate-y-0
        star-btn
        ${className}`}
      style={{
        padding: `${thickness}px 0`,
        '--star-color': color,
        ...rest.style
      }}
      {...rest}
    >
      {/* bottom star — speeds up on hover via CSS */}
      <div
        className="absolute w-[300%] h-[50%] opacity-100 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-100 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className={`relative z-1 text-center rounded-[18px]
          bg-gradient-to-b from-black to-gray-900
          border border-gray-800
          text-white text-[16px] py-[16px] px-[26px]
          transition-all duration-300
          group-hover:border-white/20
          ${innerClassName}`}
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
//         'star-movement-top': 'star-movement-top linear infinite alternate',
//       },
//       keyframes: {
//         'star-movement-bottom': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
//         },
//         'star-movement-top': {
//           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
//           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
//         },
//       },
//     },
//   }
// }
