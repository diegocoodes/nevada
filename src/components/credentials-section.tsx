import Image from "next/image";
import tuvSud from "../../public/images/credentials/tuv-sud.png";
import skinCancerFoundation from "../../public/images/credentials/skin-cancer-foundation.png";
import nfrc from "../../public/images/credentials/window-film.png";

const credentials = [
  { name: "TÜV SÜD", image: tuvSud },
  { name: "Skin Cancer Foundation", image: skinCancerFoundation },
  { name: "NFRC", image: nfrc },
];

export function CredentialsSection() {
  return (
    <section className="credentials-section" aria-label="Credenciais">
      <div className="container">
        <ul className="credentials-band">
          {credentials.map(({ name, image }) => (
            <li className="credential-item" key={name}>
              <div className="credential-logo-frame">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 600px) 90px, 160px"
                  className="credential-logo"
                />
              </div>
              <span aria-hidden="true">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
