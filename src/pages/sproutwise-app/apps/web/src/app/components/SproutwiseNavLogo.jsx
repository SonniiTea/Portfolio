import { Link } from "react-router";

/**
 * Nav wordmark — mascot + Fredoka text with green gradient.
 * Mascot height matches the wordmark via `h-[1em]` on the same font-size wrapper.
 */
export default function SproutwiseNavLogo() {
  return (
    <Link
      to="/"
      aria-label="Sproutwise home"
      className="inline-flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9CAF88] focus-visible:ring-offset-2 rounded-md"
    >
      <span className="inline-flex items-center gap-2 sm:gap-2.5 select-none text-3xl sm:text-4xl font-bold leading-none tracking-tight">
        <img
          src="/images/sproutwise-mascot.png"
          alt=""
          width={56}
          height={56}
          decoding="async"
          className="h-[1em] w-auto object-contain shrink-0"
          aria-hidden
        />
        <span className="font-['Fredoka',system-ui,sans-serif] bg-gradient-to-b from-[#8FD4A0] from-30% via-[#4F9D6A] to-[#1E3D28] bg-clip-text text-transparent">
          Sproutwise
        </span>
      </span>
    </Link>
  );
}
