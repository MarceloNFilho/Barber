interface TitleProps {
  label: string
}

export function Title({ label }: TitleProps) {
  return (
    <div className="mb-3 mt-6">
      <h2 className="text-muted-foreground text-xs font-bold uppercase">
        {label}
      </h2>
    </div>
  )
}
