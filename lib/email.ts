import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarConviteFamiliar({
  email,
  nomeEspaco,
  nomeConvidado,
  linkConvite,
}: {
  email: string;
  nomeEspaco: string;
  nomeConvidado: string;
  linkConvite: string;
}) {
  await resend.emails.send({
    from: "Histórias <no-reply@historias.app>",
    to: email,
    subject: `${nomeConvidado} convidou você para "${nomeEspaco}"`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px;">
        <h1 style="font-size: 24px; color: #111111; margin-bottom: 16px;">Você foi convidado</h1>
        <p style="font-size: 18px; color: #444444; line-height: 1.6;">
          <strong>${nomeConvidado}</strong> convidou você para fazer parte do espaço familiar
          <strong>"${nomeEspaco}"</strong> no app Histórias.
        </p>
        <p style="font-size: 18px; color: #444444; line-height: 1.6; margin-top: 16px;">
          Clique no botão abaixo para aceitar o convite e ver as histórias da família:
        </p>
        <a href="${linkConvite}"
           style="display: inline-block; margin-top: 24px; padding: 18px 32px;
                  background: #111111; color: #ffffff; text-decoration: none;
                  font-size: 18px; font-weight: bold;">
          Ver histórias da família
        </a>
        <p style="font-size: 14px; color: #888888; margin-top: 32px;">
          Este link expira em 72 horas.
        </p>
      </div>
    `,
  });
}
