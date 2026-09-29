import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, ButtonGroup, InputField } from "@figma/astraui";
import { ArrowRight, Eye, EyeOff, GraduationCap, Lock, Mail, Sparkles } from "lucide-react";

import galaxy from "@/imports/espaco_sem_personagem_1920x1080.png";
import mascot from "@/imports/espaco_com_personagem_1920x1080.png";

type Star = {
  top: string;
  left: string;
  size: number;
  dur: string;
  delay: string;
};

export default function LoginScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  // Normalized pointer offset from center, range roughly [-0.5, 0.5] on each axis.
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  const resetPointer = useCallback(() => setPointer({ x: 0, y: 0 }), []);

  // A scattered field of stars for the mid-depth parallax layer.
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 46 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.4 + 0.8,
      dur: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  const shift = (factor: number) => ({
    transform: `translate3d(${pointer.x * factor}px, ${pointer.y * factor}px, 0)`,
  });

  const canSubmit = email.trim().length > 0 && password.length > 0;

  useEffect(() => {
    document.title = "Edukation Login";
  }, []);

  return (
    <div
      ref={rootRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative min-h-screen w-full overflow-hidden bg-surface-dark"
    >
      {/* Deep-space base — the character-free galaxy, zoomed and softened for depth */}
      <div
        className="astra-parallax-layer absolute -inset-[8%]"
        style={{
          ...shift(-26),
          backgroundImage: `url(${galaxy})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          filter: "blur(3px) brightness(0.8)",
          transform: `scale(1.18) translate3d(${pointer.x * -26}px, ${pointer.y * -26}px, 0)`,
        }}
      />

      {/* Mid-depth twinkling starfield */}
      <div className="astra-parallax-layer absolute inset-0" style={shift(-52)}>
        {stars.map((star, index) => (
          <span
            key={index}
            className="astra-star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              // Custom-property values, not kit style tokens — one-off motion tuning.
              ["--dur" as string]: star.dur,
              ["--delay" as string]: star.delay,
            }}
          />
        ))}
      </div>

      {/* Foreground hero — the study mascot, the closest and most reactive layer */}
      <div
        className="astra-parallax-layer pointer-events-none absolute inset-0"
        style={{
          ...shift(40),
          backgroundImage: `url(${mascot})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Legibility scrim so kit surfaces and text stay readable over the imagery */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 40%, transparent 30%, var(--surface-dark) 100%)",
          opacity: 0.72,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-[720px]"
        style={{
          background:
            "linear-gradient(90deg, var(--surface-dark) 10%, color-mix(in srgb, var(--surface-dark) 55%, transparent) 55%, transparent 100%)",
        }}
      />

      {/* Content */}
      <main className="relative z-10 flex min-h-screen items-center p-2xl">
        <div
          className="astra-rise w-full max-w-[440px]"
          style={{ transform: `translate3d(${pointer.x * 14}px, ${pointer.y * 14}px, 0)` }}
        >


          {/* Login card — floating kit surface */}
          <div
            className="flex flex-col gap-xl rounded-corner-lg bg-surface-bg p-2xl"
            style={{ boxShadow: "0 24px 80px -24px rgb(3, 30, 104)" }}
          >
            <div className="flex flex-col gap-xs">

              <h1 className="text-title text-text-primary">Bem-vindo de volta</h1>

              <p className="text-label-sm text-text-secondary">
                Entre para explorar métodos de estudo feitos para a sua órbita.
              </p>

            </div>

            <form
              className="flex flex-col gap-lg"
              onSubmit={(event) => event.preventDefault()}
            >
              <InputField
                label="E-mail"
                type="email"
                placeholder="voce@exemplo.com"
                prefix={<Mail size={16} />}
                value={email}
                onChange={setEmail}
              />
              <InputField
                label="Senha"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                prefix={<Lock size={16} />}
                suffix={
                  <button
                   
                    type="button"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="flex items-center text-text-tertiary transition-colors hover:text-text-primary"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                value={password}
                onChange={setPassword}
              />

              <ButtonGroup align="stack">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!canSubmit}
                  iconEnd={<ArrowRight size={16} />}
                >
                  Login
                </Button>
                <Button variant="neutral" type="button">
                  Cadastrar
                </Button>
              </ButtonGroup>
            </form>

            <p className="text-video-title text-text-tertiary">
              Ao continuar, você concorda com nossos Termos e a Política de Privacidade.
            </p>
          </div>

          
        </div>
      </main>
    </div>
  );
}
