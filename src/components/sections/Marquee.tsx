const words = ['FUERZA', 'MOVILIDAD', 'CONSTANCIA', 'EQUILIBRIO', 'ENERGÍA'];
export function Marquee() {
  return (
    <div className="marquee" aria-label="Fuerza, movilidad, constancia, equilibrio y energía">
      <div className="marquee__track" aria-hidden="true">
        {[0, 1, 2].map((copy) => (
          <div className="marquee__group" key={copy}>
            {words.map((word) => (
              <span key={word}>
                <i className="marquee__asterisk">✳</i>
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
