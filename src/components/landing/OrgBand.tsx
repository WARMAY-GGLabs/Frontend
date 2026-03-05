import './OrgBand.css';

const orgs = [
  '🏥 Ministerio de Salud Bolivia',
  '🌍 OPS / OMS',
  '🤱 UNICEF',
  '💙 UNFPA',
  '🌐 Banco Mundial',
  '⚕️ ONGs Locales',
];

export default function OrgBand() {
  return (
    <section id="orgs">
      <div className="org-band">
        <p>Diseñado para organismos internacionales</p>
        <div className="org-logos">
          {orgs.map((org) => (
            <div className="org-logo animate-on-scroll" key={org}>
              {org}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
