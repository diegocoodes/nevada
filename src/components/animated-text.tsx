import { Fragment } from "react";

export function AnimatedText({ text }: { text: string }) {
  const words = text.split(/\s+/u);
  return (
    <span className="motion-text">
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="motion-word-mask">
            <span className="motion-word">{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
