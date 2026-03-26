type HoverLinksProps = {
  text: string;
  disableCursor?: boolean;
};

export default function HoverLinks({ text, disableCursor = true }: HoverLinksProps) {
  return (
    <div className="hover-link" data-cursor={disableCursor ? 'disable' : undefined}>
      <div className="hover-in">
        {text}
        <div>{text}</div>
      </div>
    </div>
  );
}
