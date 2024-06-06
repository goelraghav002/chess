

const Button = ({onClick, children, disabled}: {onClick?: () => void, children: React.ReactNode, disabled?: any}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-green-500 hover:bg-green-700 text-white font-extrabold text-xl font-mono px-8 py-4 rounded-md m-8 ${disabled ? "opacity-50 cursor-not-allowed hover:bg-green-500" : ""}`}
    >
      {children}
    </button>
  )
}

export default Button