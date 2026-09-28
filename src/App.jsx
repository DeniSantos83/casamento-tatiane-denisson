import { useEffect, useRef, useState } from "react";

import {
  CalendarDays,
  Clock,
  Gift,
  Heart,
  MapPin,
  Music,
  Pause,
  Users,
  ExternalLink,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

import "./styles.css";

/* =========================================================
   CONFIGURAÇÕES DO CASAMENTO
========================================================= */

const DATA_CASAMENTO = new Date("2026-11-19T19:00:00");

const TELEFONE_CONFIRMACAO = "5579988257470";

/* =========================================================
   APP
========================================================= */

function App() {
  const [entrou, setEntrou] = useState(false);
  const [tocando, setTocando] = useState(false);

  const audioRef = useRef(null);

  const entrarConvite = async () => {
    setEntrou(true);

    try {
      await audioRef.current?.play();
      setTocando(true);
    } catch (error) {
      console.log("O navegador não iniciou o áudio:", error);
    }

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 300);
  };

  const controlarMusica = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await audioRef.current.play();
      setTocando(true);
    } else {
      audioRef.current.pause();
      setTocando(false);
    }
  };

  return (
    <>
      {/* Corações decorativos flutuando pela tela */}
      <Coracoes />

      {/* Música do convite */}
      <audio
        ref={audioRef}
        src="/assets/musica.mp3"
        loop
        preload="auto"
      />

      {/* Capa inicial */}
      {!entrou && <Entrada onEnter={entrarConvite} />}

      {/* Conteúdo principal */}
      <main className={`convite ${entrou ? "convite--aberto" : ""}`}>
        <Hero />

        <Mensagem />

        <Galeria />

        <Evento />

        <Confirmacao />

        <Presentes />

        <Pix />

        <Encerramento />
      </main>

      {/* Controle flutuante da música */}
      {entrou && (
        <button
          className="music-button"
          onClick={controlarMusica}
          aria-label={tocando ? "Pausar música" : "Tocar música"}
          title={tocando ? "Pausar música" : "Tocar música"}
        >
          {tocando ? <Pause size={19} /> : <Music size={19} />}
        </button>
      )}
    </>
  );
}

/* =========================================================
   CAPA DE ENTRADA
========================================================= */

function Entrada({ onEnter }) {
  return (
    <section className="entrada">
      <img
        src="/assets/capa.jpeg"
        alt=""
        className="entrada__imagem"
      />

      <div className="entrada__overlay" />

      <div className="entrada__conteudo">
        <p className="eyebrow entrada__eyebrow">
          Save the Date
        </p>

        <h1 className="nomes nomes--capa">
          Tatiane <span>&</span> Dênisson
        </h1>

        <div className="entrada__linha" />

        <p className="entrada__data">
          19 · 11 · 2026
        </p>

        <button
          className="botao-entrada"
          onClick={onEnter}
        >
          <Heart size={17} />
          Entrar no convite
        </button>

        <p className="entrada__musica">
          <Music size={13} />
          Ative o som para uma experiência completa
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="hero">
      <img
        src="/assets/foto6.jpeg"
        alt="Tatiane e Dênisson"
        className="hero__imagem"
      />

      <div className="hero__overlay" />

      <div className="hero__conteudo">
        <p className="eyebrow hero__eyebrow">
          Nós vamos nos casar
        </p>

        <h2 className="nomes nomes--hero">
          Tatiane <span>&</span> Dênisson
        </h2>

        <p className="hero__data">
          19 de novembro de 2026
        </p>

        <ContagemRegressiva />

        <a
          className="hero__scroll"
          href="#mensagem"
        >
          <span>Descubra nossa história</span>
          <ChevronDown size={20} />
        </a>
      </div>
    </section>
  );
}

/* =========================================================
   CONTAGEM REGRESSIVA
========================================================= */

function ContagemRegressiva() {
  const calcularTempo = () => {
    const diferenca =
      DATA_CASAMENTO.getTime() - Date.now();

    if (diferenca <= 0) {
      return {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
      };
    }

    return {
      dias: Math.floor(
        diferenca / (1000 * 60 * 60 * 24)
      ),

      horas: Math.floor(
        (diferenca / (1000 * 60 * 60)) % 24
      ),

      minutos: Math.floor(
        (diferenca / (1000 * 60)) % 60
      ),

      segundos: Math.floor(
        (diferenca / 1000) % 60
      ),
    };
  };

  const [tempo, setTempo] =
    useState(calcularTempo());

  useEffect(() => {
    const timer = setInterval(() => {
      setTempo(calcularTempo());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="contador">
      <ContadorItem
        valor={tempo.dias}
        texto="Dias"
      />

      <ContadorItem
        valor={tempo.horas}
        texto="Horas"
      />

      <ContadorItem
        valor={tempo.minutos}
        texto="Min"
      />

      <ContadorItem
        valor={tempo.segundos}
        texto="Seg"
      />
    </div>
  );
}

function ContadorItem({ valor, texto }) {
  return (
    <div className="contador__item">
      <strong>
        {String(valor).padStart(2, "0")}
      </strong>

      <span>{texto}</span>
    </div>
  );
}

/* =========================================================
   MENSAGEM
========================================================= */

function Mensagem() {
  return (
    <section
      className="mensagem section"
      id="mensagem"
    >
      <div className="section__small">
        Uma promessa. Um propósito.
      </div>

      <blockquote>
        “Até aqui nos ajudou o Senhor.”
        <span>1 Samuel 7:12</span>
      </blockquote>

      <div className="mensagem__texto">
        <p>
          Nossa história é um testemunho da
          fidelidade de Deus. Aprendemos que o tempo
          d’Ele é perfeito, que a espera nunca é em
          vão e que cada promessa se cumpre no
          momento certo.
        </p>

        <p>
          Depois de confiar, orar e descansar no
          Senhor, recebemos a dádiva de celebrar o
          amor que Ele escreveu para nós.
        </p>

        <p>
          Com o coração transbordando de gratidão
          pela bondade e graça do nosso Deus, temos
          a alegria de convidar você para compartilhar
          conosco este momento tão especial, em que
          nos uniremos em aliança diante do Senhor.
        </p>
      </div>

      <blockquote className="mensagem__final">
        “Aquele que prometeu é fiel.”
        <span>Hebreus 10:23</span>
      </blockquote>

      <p className="assinatura">
        Tatiane <span>&</span> Dênisson
      </p>
    </section>
  );
}

/* =========================================================
   GALERIA
========================================================= */

function Galeria() {
  return (
    <section className="galeria section">
      <div className="section__cabecalho">
        <p className="section__small">
          Memórias que nos trouxeram até aqui
        </p>

        <h2>Nossa história em momentos</h2>
      </div>

      <div className="galeria__grid">
        <figure className="galeria__item galeria__item--grande">
          <img
            src="/assets/foto2.jpeg"
            alt="Tatiane e Dênisson"
          />
        </figure>

        <figure className="galeria__item">
          <img
            src="/assets/foto1.jpeg"
            alt="Tatiane e Dênisson"
          />
        </figure>

        <figure className="galeria__item">
          <img
            src="/assets/foto3.jpeg"
            alt="Tatiane e Dênisson"
          />
        </figure>

        <figure className="galeria__item galeria__item--horizontal">
          <img
            src="/assets/foto4.jpeg"
            alt="Tatiane e Dênisson"
          />
        </figure>

        <figure className="galeria__item">
          <img
            src="/assets/foto5.jpeg"
            alt="Tatiane e Dênisson"
          />
        </figure>

        <figure className="galeria__item">
          <img
            src="/assets/foto6.jpeg"
            alt="Tatiane e Dênisson"
          />
        </figure>
      </div>
    </section>
  );
}

/* =========================================================
   EVENTO
========================================================= */

function Evento() {
  return (
    <section className="evento section">
      <div className="evento__imagem">
        <img
          src="/assets/foto3.jpeg"
          alt="Tatiane e Dênisson"
        />
      </div>

      <div className="evento__conteudo">
        <p className="section__small">
          Reserve esta data
        </p>

        <h2>O grande dia</h2>

        <div className="evento__informacoes">

          {/* Data */}
          <div className="evento__info">
            <CalendarDays />

            <div>
              <span>Data</span>

              <strong>
                19 de novembro de 2026
              </strong>
            </div>
          </div>

          {/* Horário */}
          <div className="evento__info">
            <Clock />

            <div>
              <span>Horário</span>

              <strong>
                Em breve
              </strong>
            </div>
          </div>

          {/* Local */}
          <div className="evento__info">
            <MapPin />

            <div>
              <span>Local</span>

              <strong>San Lino</strong>

              <p>
                Av. Confiança, 520 — Industrial
                <br />
                Aracaju — SE
              </p>
            </div>
          </div>

        </div>

        <a
          className="botao botao--escuro"
          href="https://maps.app.goo.gl/EQy9C31nrhaqzVwT6"
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={17} />
          Ver localização
        </a>
      </div>
    </section>
  );
}

/* =========================================================
   CONFIRMAÇÃO PELO WHATSAPP
========================================================= */

function Confirmacao() {
  const mensagemWhatsApp = encodeURIComponent(
    `Olá! Gostaria de confirmar minha presença no casamento de Tatiane & Dênisson.

Nome:

Acompanhante: Sim / Não

Nome do acompanhante, se houver:

Estou ciente de que este convite permite no máximo 1 acompanhante e que a confirmação deve ser realizada até 15/10/2026.`
  );

  const whatsappUrl =
    `https://wa.me/${TELEFONE_CONFIRMACAO}?text=${mensagemWhatsApp}`;

  return (
    <section className="rsvp section">
      <div className="rsvp__cabecalho">

        <Users size={26} />

        <p className="section__small">
          Confirmação de presença
        </p>

        <h2>
          Esperamos por você
        </h2>

        <p>
          Para nos ajudar a preparar cada detalhe
          com carinho, confirme sua presença até{" "}
          <strong>15/10/2026</strong>.
        </p>

        <div className="rsvp__aviso">
          <Heart size={19} />

          <p>
            Este convite permite{" "}
            <strong>1 acompanhante</strong>.
            Ao confirmar sua presença, informe
            também o nome do acompanhante.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="botao botao--dourado rsvp__whatsapp"
        >
          <MessageCircle size={18} />
          Confirmar pelo WhatsApp
        </a>

      </div>
    </section>
  );
}

/* =========================================================
   LISTA DE PRESENTES
========================================================= */

function Presentes() {
  return (
    <section className="presentes section">
      <Gift size={28} />

      <p className="section__small">
        Com carinho
      </p>

      <h2>
        Lista de presentes
      </h2>

      <p>
        O maior presente será ter você conosco
        neste dia. Mas, se desejar nos presentear,
        preparamos uma lista especial.
      </p>

      <a
        href="https://www.ferreiracosta.com/lista-de-casamento/presentes/tatianeedenisson"
        target="_blank"
        rel="noreferrer"
        className="botao botao--escuro"
      >
        <Gift size={17} />

        Ver lista de presentes

        <ExternalLink size={15} />
      </a>
    </section>
  );
}

/* =========================================================
   PIX
========================================================= */

function Pix() {
  return (
    <section className="pix section">

      <div className="pix__conteudo">

        <p className="section__small">
          Outra forma de presentear
        </p>

        <h2>
          Presente via PIX
        </h2>

        <p>
          Se preferir, você também pode nos
          presentear através do PIX. Basta apontar
          a câmera do celular para o QR Code.
        </p>

      </div>

      <div className="pix__qrcode">

        <img
          src="/assets/qrcode-pix.png"
          alt="QR Code PIX de Tatiane e Dênisson"
        />

      </div>

    </section>
  );
}

/* =========================================================
   ENCERRAMENTO
========================================================= */

function Encerramento() {
  return (
    <footer className="encerramento">

      <img
        src="/assets/foto1.jpeg"
        alt="Tatiane e Dênisson"
        className="encerramento__imagem"
      />

      <div className="encerramento__overlay" />

      <div className="encerramento__conteudo">

        <Heart size={25} />

        <p>
          Esperamos você para celebrar conosco.
        </p>

        <h2 className="nomes nomes--footer">
          Tatiane <span>&</span> Dênisson
        </h2>

        <p className="encerramento__data">
          19 · 11 · 2026
        </p>

      </div>

    </footer>
  );
}


/* =========================================================
   CORAÇÕES FLUTUANTES
========================================================= */

function Coracoes() {
  const coracoes = [
    { left: "5%", delay: "0s", duration: "15s", size: "14px" },
    { left: "14%", delay: "5s", duration: "18s", size: "20px" },
    { left: "25%", delay: "2s", duration: "16s", size: "12px" },
    { left: "37%", delay: "8s", duration: "20s", size: "17px" },
    { left: "49%", delay: "4s", duration: "17s", size: "13px" },
    { left: "61%", delay: "10s", duration: "21s", size: "19px" },
    { left: "73%", delay: "1s", duration: "16s", size: "14px" },
    { left: "84%", delay: "7s", duration: "19s", size: "18px" },
    { left: "94%", delay: "3s", duration: "17s", size: "12px" },
  ];

  return (
    <div className="coracoes" aria-hidden="true">
      {coracoes.map((coracao, index) => (
        <span
          key={index}
          className="coracao-flutuante"
          style={{
            "--left": coracao.left,
            "--delay": coracao.delay,
            "--duration": coracao.duration,
            "--size": coracao.size,
          }}
        >
          ♡
        </span>
      ))}
    </div>
  );
}

export default App;