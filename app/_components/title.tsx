interface TitleProps {
  label: string
}

export function Title({ label }: TitleProps) {
  return (
    <div className="mb-3 mt-6 px-5">
      <h2 className="text-xs font-bold uppercase text-gray-400">{label}</h2>
    </div>
  )
}
